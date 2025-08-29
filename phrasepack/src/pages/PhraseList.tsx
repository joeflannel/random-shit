import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchCountryLanguageMap, fetchPhrasePack } from '../utils/data'
import type { Phrase } from '../types'
import { getLastViewedPhraseId, setLastViewedPhraseId } from '../utils/storage'
import { speakText } from '../utils/tts'
import { t, getPhraseTranslation, getSentenceTranslation } from '../utils/i18n'
import { getEffectiveLocaleForCountry, getTtsLocaleForCountry } from '../utils/fallbacks'

// Country -> effective locale resolver (shared with CountryPicker)

function countryToPrimaryLocale(map: Record<string, string[]>, countryCode: string): string | null {
  const code = (countryCode || '').toUpperCase()
  if (!code) return null
  return getEffectiveLocaleForCountry(code, map)
}

// Helper function to extract phrase key from phrase ID
function getPhraseKey(phraseId: string): string {
  // Extract the key part after the category prefix (e.g., "greet-hello" -> "hello")
  const parts = phraseId.split('-')
  if (parts.length >= 2) {
    return parts.slice(1).join('-')
  }
  return phraseId
}

export default function PhraseList() {
  const navigate = useNavigate()
  const { countryCode } = useParams<{ countryCode: string }>()
  const [phrases, setPhrases] = useState<Phrase[]>([])
  const [locale, setLocale] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [openId, setOpenId] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const map = await fetchCountryLanguageMap()
        const effective = countryToPrimaryLocale(map, countryCode || '')
        if (!effective) throw new Error('No primary language for this country')
        // Choose TTS locale variant (e.g., en-GB for GB/AU/CA, es-MX vs es-ES)
        const ttsLocale = getTtsLocaleForCountry(effective, countryCode || '')
        setLocale(ttsLocale)
        const pack = await fetchPhrasePack(effective)
        setPhrases(pack.phrases)
      } catch (e: any) {
        setError(e?.message || 'Failed to load phrases')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [countryCode])

  const lastViewedId = useMemo(() => getLastViewedPhraseId(), [locale])

  function handleBack() {
    navigate('/')
  }

  async function handleSpeak(text: string) {
    await speakText(text, locale)
  }

  if (loading) return <div style={{ padding: 16 }}>{t('loading')}</div>
  if (error) return <div style={{ padding: 16, color: 'crimson' }}>{error}</div>

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: 16 }}>
      <button onClick={handleBack} style={{ marginBottom: 12 }}>{t('back')}</button>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <h1 style={{ fontSize: 22, marginBottom: 8 }}>{t('essentialPhrases')} ({locale})</h1>
        <div />
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {groupByCategory(phrases).map(({ category, items }) => (
          <div key={category}>
            <h2 style={{ fontSize: 16, margin: '12px 0 8px', opacity: 0.8 }}>{category}</h2>
            {items.map((p) => {
              const phraseKey = getPhraseKey(p.id)
              const translatedPhrase = getPhraseTranslation(phraseKey)
              const translatedSentence = getSentenceTranslation(phraseKey)
              
              return (
                <li key={p.id} style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 10,
                  background: lastViewedId === p.id ? '#f0f9ff' : 'white'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>{p.native}</div>
                      <div style={{ opacity: 0.7 }}>{translatedPhrase}</div>
                      {p.transliteration && (
                        <div style={{ opacity: 0.7, fontWeight: 700 }}>{p.transliteration}</div>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => handleSpeak(p.native)}>▶️ {t('speak')}</button>
                      <ExclusiveTooltip
                        open={openId === p.id}
                        onToggle={() => setOpenId(openId === p.id ? null : p.id)}
                        onClose={() => setOpenId(null)}
                        label={t('more')}
                      >
                        <div>
                          {p.transliteration && <div style={{ marginBottom: 4 }}><strong>{t('transliteration')}:</strong> {p.transliteration}</div>}
                          {p.sentenceNative && <div style={{ marginBottom: 4 }}><strong>{t('sentence')}:</strong> {p.sentenceNative}</div>}
                          {translatedSentence && <div style={{ marginBottom: 8 }}><strong>{t('translation')}:</strong> {translatedSentence}</div>}
                          {p.sentenceNative && (
                            <button onClick={() => { setLastViewedPhraseId(p.id); handleSpeak(p.sentenceNative!) }}>▶️ {t('speakSentence')}</button>
                          )}
                          {!p.sentenceNative && !translatedSentence && !p.transliteration && <div style={{ opacity: 0.7 }}>{t('noExtraDetails')}</div>}
                        </div>
                      </ExclusiveTooltip>
                    </div>
                  </div>
                </li>
              )
            })}
          </div>
        ))}
      </ul>
    </div>
  )
}
function groupByCategory(phrases: Phrase[]): { category: string, items: Phrase[] }[] {
  const map = new Map<string, Phrase[]>()
  for (const p of phrases) {
    const arr = map.get(p.category) || []
    arr.push(p)
    map.set(p.category, arr)
  }
  return Array.from(map.entries()).map(([category, items]) => ({ category, items }))
}

function ExclusiveTooltip({ open, onToggle, onClose, label, children }: { open: boolean, onToggle: () => void, onClose: () => void, label: string, children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!open) return
    function onDocClick(e: MouseEvent) {
      if (!ref.current) return
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [open, onToggle])
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])
  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button onClick={onToggle}>{label}</button>
      {open && (
        <div style={{
          position: 'absolute',
          right: 0,
          top: 'calc(100% + 6px)',
          minWidth: 260,
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: 8,
          padding: 12,
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          zIndex: 10
        }}>
          {children}
        </div>
      )}
    </div>
  )
}

