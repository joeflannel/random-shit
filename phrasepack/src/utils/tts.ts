// ElevenLabs TTS API integration with browser TTS fallback
import { ELEVENLABS_CONFIG, getVoiceIdForLocale, isLanguageSupported, isElevenLabsConfigured } from '../config/elevenlabs'

// ElevenLabs TTS function
async function speakWithElevenLabs(text: string, locale: string): Promise<void> {
  try {
    // Check if ElevenLabs is configured
    if (!isElevenLabsConfigured()) {
      throw new Error('ElevenLabs API key not configured')
    }

    // Check if the language is supported by ElevenLabs
    if (!isLanguageSupported(locale)) {
      throw new Error(`Language ${locale} not supported by ElevenLabs`)
    }

    const voiceId = getVoiceIdForLocale(locale)
    
    const response = await fetch(`${ELEVENLABS_CONFIG.BASE_URL}/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_CONFIG.API_KEY!,
      },
      body: JSON.stringify({
        text: text,
        model_id: ELEVENLABS_CONFIG.MODEL_ID,
        voice_settings: ELEVENLABS_CONFIG.VOICE_SETTINGS
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(`ElevenLabs API error: ${response.status} - ${errorData.detail?.message || 'Unknown error'}`)
    }

    const audioBlob = await response.blob()
    const audioUrl = URL.createObjectURL(audioBlob)
    const audio = new Audio(audioUrl)
    
    return new Promise((resolve, reject) => {
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl)
        resolve()
      }
      audio.onerror = () => {
        URL.revokeObjectURL(audioUrl)
        reject(new Error('Audio playback failed'))
      }
      audio.play().catch(reject)
    })
  } catch (error) {
    console.warn('ElevenLabs TTS failed, falling back to browser TTS:', error)
    throw error
  }
}

// Browser TTS fallback functions
function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  const voices = window.speechSynthesis.getVoices()
  if (voices && voices.length > 0) return Promise.resolve(voices)
  return new Promise((resolve) => {
    const handle = () => {
      const loaded = window.speechSynthesis.getVoices()
      if (loaded && loaded.length > 0) {
        window.speechSynthesis.removeEventListener('voiceschanged', handle)
        resolve(loaded)
      }
    }
    window.speechSynthesis.addEventListener('voiceschanged', handle)
    // Fallback trigger
    window.speechSynthesis.getVoices()
  })
}

function selectVoiceForLocale(voices: SpeechSynthesisVoice[], locale?: string): SpeechSynthesisVoice | undefined {
  if (!locale) return voices.find(v => v.default)
  const normalized = locale.toLowerCase()
  // Exact match
  const exact = voices.find(v => v.lang?.toLowerCase() === normalized)
  if (exact) return exact
  // Match language without region
  const langOnly = normalized.split('-')[0]
  const partial = voices.find(v => v.lang?.toLowerCase().startsWith(langOnly))
  if (partial) return partial
  return voices.find(v => v.default)
}

async function speakWithBrowserTTS(text: string, locale?: string): Promise<void> {
  if (!('speechSynthesis' in window)) {
    throw new Error('Speech synthesis not supported')
  }
  
  window.speechSynthesis.cancel()
  const voices = await loadVoices()
  const utterance = new SpeechSynthesisUtterance(text)
  const voice = selectVoiceForLocale(voices, locale)
  if (voice) utterance.voice = voice
  if (locale) utterance.lang = locale
  
  return new Promise((resolve, reject) => {
    utterance.onend = () => resolve()
    utterance.onerror = (event) => reject(new Error(`TTS error: ${event.error}`))
    window.speechSynthesis.speak(utterance)
  })
}

// Main TTS function - tries ElevenLabs first, falls back to browser TTS
export async function speakText(text: string, locale?: string): Promise<void> {
  if (!locale) {
    // If no locale specified, use browser TTS
    return speakWithBrowserTTS(text, locale)
  }

  // Check if ElevenLabs is configured first
  if (!isElevenLabsConfigured()) {
    console.log('ElevenLabs not configured, using browser TTS')
    return speakWithBrowserTTS(text, locale)
  }

  console.log('ElevenLabs is configured, checking language support...')
  console.log('Current locale:', locale)
  console.log('Language supported:', isLanguageSupported(locale))

  try {
    // Try ElevenLabs if language is supported
    if (isLanguageSupported(locale)) {
      console.log('Using ElevenLabs TTS for language:', locale)
      await speakWithElevenLabs(text, locale)
    } else {
      // Language not supported by ElevenLabs, use browser TTS directly
      console.log(`Language ${locale} not supported by ElevenLabs, using browser TTS`)
      await speakWithBrowserTTS(text, locale)
    }
  } catch (error) {
    // Fall back to browser TTS
    console.log('Falling back to browser TTS:', error)
    await speakWithBrowserTTS(text, locale)
  }
}

// Export individual functions for testing or specific use cases
export { speakWithElevenLabs, speakWithBrowserTTS }

