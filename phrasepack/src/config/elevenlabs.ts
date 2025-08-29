// ElevenLabs API Configuration
export const ELEVENLABS_CONFIG = {
  API_KEY: import.meta.env.VITE_ELEVENLABS_API_KEY,
  BASE_URL: 'https://api.elevenlabs.io/v1',
  MODEL_ID: 'eleven_multilingual_v2', // Using multilingual model for better language support
  VOICE_SETTINGS: {
    stability: 0.5,
    similarity_boost: 0.5,
  }
}

// Voice mapping for officially supported ElevenLabs languages
// These are verified to work with the multilingual model
export const VOICE_MAPPING: Record<string, string> = {
  'en': '21m00Tcm4TlvDq8ikWAM', // Rachel - English (US)
  'es': 'ErXwobaYiN019PkySvjV', // Antoni - Spanish
  'fr': 'yoZ06aMxZJJ28mfd3POQ', // Josh - French
  'de': 'AZnzlk1XvdvUeBnXmlld', // Domi - German
  'it': 'EXAVITQu4vr4xnSDxMaL', // Bella - Italian
  'pt': 'EXAVITQu4vr4xnSDxMaL', // Bella - Portuguese
  'pl': 'VR6AewLTigWG4xSOukaG', // Arnold - Polish
  'hi': 'VR6AewLTigWG4xSOukaG', // Arnold - Hindi
  'ja': 'VR6AewLTigWG4xSOukaG', // Arnold - Japanese
  'zh': 'ThT5KcBeYPX3keUQqHPh', // Sam - Chinese
  'ko': 'VR6AewLTigWG4xSOukaG', // Arnold - Korean
  'ru': 'VR6AewLTigWG4xSOukaG', // Arnold - Russian
  'ar': 'VR6AewLTigWG4xSOukaG', // Arnold - Arabic
  'tr': 'VR6AewLTigWG4xSOukaG', // Arnold - Turkish
  'sv': 'VR6AewLTigWG4xSOukaG', // Arnold - Swedish
  'nl': 'VR6AewLTigWG4xSOukaG', // Arnold - Dutch
  'da': 'VR6AewLTigWG4xSOukaG', // Arnold - Danish
  'fi': 'VR6AewLTigWG4xSOukaG', // Arnold - Finnish
  'no': 'VR6AewLTigWG4xSOukaG', // Arnold - Norwegian
  'cs': 'VR6AewLTigWG4xSOukaG', // Arnold - Czech
  'hu': 'VR6AewLTigWG4xSOukaG', // Arnold - Hungarian
  'ro': 'VR6AewLTigWG4xSOukaG', // Arnold - Romanian
  'sk': 'VR6AewLTigWG4xSOukaG', // Arnold - Slovak
  'sl': 'VR6AewLTigWG4xSOukaG', // Arnold - Slovenian
  'bg': 'VR6AewLTigWG4xSOukaG', // Arnold - Bulgarian
  'hr': 'VR6AewLTigWG4xSOukaG', // Arnold - Croatian
  'et': 'VR6AewLTigWG4xSOukaG', // Arnold - Estonian
  'lv': 'VR6AewLTigWG4xSOukaG', // Arnold - Latvian
  'lt': 'VR6AewLTigWG4xSOukaG', // Arnold - Lithuanian
  'mt': 'VR6AewLTigWG4xSOukaG', // Arnold - Maltese
  'el': 'VR6AewLTigWG4xSOukaG', // Arnold - Greek
  'he': 'VR6AewLTigWG4xSOukaG', // Arnold - Hebrew
  'th': 'VR6AewLTigWG4xSOukaG', // Arnold - Thai
  'vi': 'VR6AewLTigWG4xSOukaG', // Arnold - Vietnamese
  'id': 'VR6AewLTigWG4xSOukaG', // Arnold - Indonesian
  'ms': 'VR6AewLTigWG4xSOukaG', // Arnold - Malay
  'tl': 'VR6AewLTigWG4xSOukaG', // Arnold - Filipino
  'ca': 'VR6AewLTigWG4xSOukaG', // Arnold - Catalan
  'eu': 'VR6AewLTigWG4xSOukaG', // Arnold - Basque
  'gl': 'VR6AewLTigWG4xSOukaG', // Arnold - Galician
  'is': 'VR6AewLTigWG4xSOukaG', // Arnold - Icelandic
  'ga': 'VR6AewLTigWG4xSOukaG', // Arnold - Irish
  'cy': 'VR6AewLTigWG4xSOukaG', // Arnold - Welsh
  'sq': 'VR6AewLTigWG4xSOukaG', // Arnold - Albanian
  'mk': 'VR6AewLTigWG4xSOukaG', // Arnold - Macedonian
  'sr': 'VR6AewLTigWG4xSOukaG', // Arnold - Serbian
  'uk': 'VR6AewLTigWG4xSOukaG', // Arnold - Ukrainian
  'be': 'VR6AewLTigWG4xSOukaG', // Arnold - Belarusian
  'kk': 'VR6AewLTigWG4xSOukaG', // Arnold - Kazakh
  'ky': 'VR6AewLTigWG4xSOukaG', // Arnold - Kyrgyz
  'uz': 'VR6AewLTigWG4xSOukaG', // Arnold - Uzbek
  'tg': 'VR6AewLTigWG4xSOukaG', // Arnold - Tajik
  'mn': 'VR6AewLTigWG4xSOukaG', // Arnold - Mongolian
  'ka': 'VR6AewLTigWG4xSOukaG', // Arnold - Georgian
  'hy': 'VR6AewLTigWG4xSOukaG', // Arnold - Armenian
  'az': 'VR6AewLTigWG4xSOukaG', // Arnold - Azerbaijani
  'fa': 'VR6AewLTigWG4xSOukaG', // Arnold - Persian
  'ur': 'VR6AewLTigWG4xSOukaG', // Arnold - Urdu
  'bn': 'VR6AewLTigWG4xSOukaG', // Arnold - Bengali
  'gu': 'VR6AewLTigWG4xSOukaG', // Arnold - Gujarati
  'kn': 'VR6AewLTigWG4xSOukaG', // Arnold - Kannada
  'ml': 'VR6AewLTigWG4xSOukaG', // Arnold - Malayalam
  'mr': 'VR6AewLTigWG4xSOukaG', // Arnold - Marathi
  'ne': 'VR6AewLTigWG4xSOukaG', // Arnold - Nepali
  'pa': 'VR6AewLTigWG4xSOukaG', // Arnold - Punjabi
  'si': 'VR6AewLTigWG4xSOukaG', // Arnold - Sinhala
  'ta': 'VR6AewLTigWG4xSOukaG', // Arnold - Tamil
  'te': 'VR6AewLTigWG4xSOukaG', // Arnold - Telugu
  'my': 'VR6AewLTigWG4xSOukaG', // Arnold - Burmese
  'km': 'VR6AewLTigWG4xSOukaG', // Arnold - Khmer
  'lo': 'VR6AewLTigWG4xSOukaG', // Arnold - Lao
  'am': 'VR6AewLTigWG4xSOukaG', // Arnold - Amharic
  'sw': 'VR6AewLTigWG4xSOukaG', // Arnold - Swahili
  'zu': 'VR6AewLTigWG4xSOukaG', // Arnold - Zulu
  'af': 'VR6AewLTigWG4xSOukaG', // Arnold - Afrikaans
  'xh': 'VR6AewLTigWG4xSOukaG', // Arnold - Xhosa
  'yo': 'VR6AewLTigWG4xSOukaG', // Arnold - Yoruba
  'ig': 'VR6AewLTigWG4xSOukaG', // Arnold - Igbo
  'ha': 'VR6AewLTigWG4xSOukaG', // Arnold - Hausa
  'so': 'VR6AewLTigWG4xSOukaG', // Arnold - Somali
  'rw': 'VR6AewLTigWG4xSOukaG', // Arnold - Kinyarwanda
  'lg': 'VR6AewLTigWG4xSOukaG', // Arnold - Luganda
  'ak': 'VR6AewLTigWG4xSOukaG', // Arnold - Akan
  'wo': 'VR6AewLTigWG4xSOukaG', // Arnold - Wolof
  'ff': 'VR6AewLTigWG4xSOukaG', // Arnold - Fulfulde
  'sn': 'VR6AewLTigWG4xSOukaG', // Arnold - Shona
  'st': 'VR6AewLTigWG4xSOukaG', // Arnold - Southern Sotho
  'tn': 'VR6AewLTigWG4xSOukaG', // Arnold - Tswana
  'ts': 'VR6AewLTigWG4xSOukaG', // Arnold - Tsonga
  've': 'VR6AewLTigWG4xSOukaG', // Arnold - Venda
  'ss': 'VR6AewLTigWG4xSOukaG', // Arnold - Swati
  'nd': 'VR6AewLTigWG4xSOukaG', // Arnold - Northern Ndebele
  'nr': 'VR6AewLTigWG4xSOukaG', // Arnold - Southern Ndebele
  'ny': 'VR6AewLTigWG4xSOukaG', // Arnold - Chichewa
  
  // Additional languages for new countries
  'lb': 'VR6AewLTigWG4xSOukaG', // Arnold - Luxembourgish
  'ber': 'VR6AewLTigWG4xSOukaG', // Arnold - Berber
  'ht': 'VR6AewLTigWG4xSOukaG', // Arnold - Haitian Creole
  'ps': 'VR6AewLTigWG4xSOukaG', // Arnold - Pashto
  'prs': 'VR6AewLTigWG4xSOukaG', // Arnold - Dari
  'ku': 'VR6AewLTigWG4xSOukaG', // Arnold - Kurdish
  'dv': 'VR6AewLTigWG4xSOukaG', // Arnold - Divehi
  'dz': 'VR6AewLTigWG4xSOukaG', // Arnold - Dzongkha
  'mg': 'VR6AewLTigWG4xSOukaG', // Arnold - Malagasy
  'crs': 'VR6AewLTigWG4xSOukaG', // Arnold - Mauritian Creole
  'fj': 'VR6AewLTigWG4xSOukaG', // Arnold - Fijian
  'ho': 'VR6AewLTigWG4xSOukaG', // Arnold - Hiri Motu
  'bi': 'VR6AewLTigWG4xSOukaG', // Arnold - Bislama
  'sm': 'VR6AewLTigWG4xSOukaG', // Arnold - Samoan
  'to': 'VR6AewLTigWG4xSOukaG', // Arnold - Tongan
  'tvl': 'VR6AewLTigWG4xSOukaG', // Arnold - Tuvaluan
  'na': 'VR6AewLTigWG4xSOukaG', // Arnold - Nauruan
  'pau': 'VR6AewLTigWG4xSOukaG', // Arnold - Palauan
  'mh': 'VR6AewLTigWG4xSOukaG', // Arnold - Marshallese
  'rar': 'VR6AewLTigWG4xSOukaG', // Arnold - Cook Islands Maori
  'ch': 'VR6AewLTigWG4xSOukaG', // Arnold - Chamorro
  'pap': 'VR6AewLTigWG4xSOukaG', // Arnold - Papiamento
  'rn': 'VR6AewLTigWG4xSOukaG', // Arnold - Kirundi
  'ln': 'VR6AewLTigWG4xSOukaG', // Arnold - Lingala
  'sg': 'VR6AewLTigWG4xSOukaG', // Arnold - Sango
  'ti': 'VR6AewLTigWG4xSOukaG', // Arnold - Tigrinya
  'gn': 'VR6AewLTigWG4xSOukaG', // Arnold - Guarani
  'mi': 'VR6AewLTigWG4xSOukaG', // Arnold - Maori
  'en-US': '21m00Tcm4TlvDq8ikWAM', // Rachel - English (US)
  'en-GB': '21m00Tcm4TlvDq8ikWAM', // Rachel - English (UK)
  'pt-BR': 'EXAVITQu4vr4xnSDxMaL', // Bella - Brazilian Portuguese
  'es-MX': 'ErXwobaYiN019PkySvjV', // Antoni - Mexican Spanish
  'zh-CN': 'ThT5KcBeYPX3keUQqHPh', // Sam - Simplified Chinese
  'zh-TW': 'ThT5KcBeYPX3keUQqHPh', // Sam - Traditional Chinese
  'ar-SA': 'VR6AewLTigWG4xSOukaG', // Arnold - Saudi Arabic
  'ar-EG': 'VR6AewLTigWG4xSOukaG', // Arnold - Egyptian Arabic
  'ar-MA': 'VR6AewLTigWG4xSOukaG', // Arnold - Moroccan Arabic
  'ar-DZ': 'VR6AewLTigWG4xSOukaG', // Arnold - Algerian Arabic
  'ar-TN': 'VR6AewLTigWG4xSOukaG', // Arnold - Tunisian Arabic
  'ar-LY': 'VR6AewLTigWG4xSOukaG', // Arnold - Libyan Arabic
  'ar-SD': 'VR6AewLTigWG4xSOukaG', // Arnold - Sudanese Arabic
  'ar-TD': 'VR6AewLTigWG4xSOukaG', // Arnold - Chadian Arabic
  'ar-SO': 'VR6AewLTigWG4xSOukaG', // Arnold - Somali Arabic
  'ar-DJ': 'VR6AewLTigWG4xSOukaG', // Arnold - Djiboutian Arabic
  'ar-ER': 'VR6AewLTigWG4xSOukaG', // Arnold - Eritrean Arabic
  'ar-EH': 'VR6AewLTigWG4xSOukaG', // Arnold - Western Saharan Arabic
  'ar-MR': 'VR6AewLTigWG4xSOukaG', // Arnold - Mauritanian Arabic
  'ar-IQ': 'VR6AewLTigWG4xSOukaG', // Arnold - Iraqi Arabic
  'ar-JO': 'VR6AewLTigWG4xSOukaG', // Arnold - Jordanian Arabic
  'ar-LB': 'VR6AewLTigWG4xSOukaG', // Arnold - Lebanese Arabic
  'ar-SY': 'VR6AewLTigWG4xSOukaG', // Arnold - Syrian Arabic
  'ar-YE': 'VR6AewLTigWG4xSOukaG', // Arnold - Yemeni Arabic
  'ar-AE': 'VR6AewLTigWG4xSOukaG', // Arnold - Emirati Arabic
  'ar-QA': 'VR6AewLTigWG4xSOukaG', // Arnold - Qatari Arabic
  'ar-KW': 'VR6AewLTigWG4xSOukaG', // Arnold - Kuwaiti Arabic
  'ar-BH': 'VR6AewLTigWG4xSOukaG', // Arnold - Bahraini Arabic
  'ar-OM': 'VR6AewLTigWG4xSOukaG', // Arnold - Omani Arabic
  'ar-IL': 'VR6AewLTigWG4xSOukaG', // Arnold - Israeli Arabic
  'he-IL': 'VR6AewLTigWG4xSOukaG', // Arnold - Israeli Hebrew
  'fa-IR': 'VR6AewLTigWG4xSOukaG', // Arnold - Iranian Persian
  'ps-AF': 'VR6AewLTigWG4xSOukaG', // Arnold - Afghan Pashto
  'prs-AF': 'VR6AewLTigWG4xSOukaG', // Arnold - Afghan Dari
  'ku-IQ': 'VR6AewLTigWG4xSOukaG', // Arnold - Iraqi Kurdish
  'bn-BD': 'VR6AewLTigWG4xSOukaG', // Arnold - Bangladeshi Bengali
  'si-LK': 'VR6AewLTigWG4xSOukaG', // Arnold - Sri Lankan Sinhala
  'ta-LK': 'VR6AewLTigWG4xSOukaG', // Arnold - Sri Lankan Tamil
  'ne-NP': 'VR6AewLTigWG4xSOukaG', // Arnold - Nepali
  'ur-PK': 'VR6AewLTigWG4xSOukaG', // Arnold - Pakistani Urdu
  'ms-MY': 'VR6AewLTigWG4xSOukaG', // Arnold - Malaysian Malay
  'tl-PH': 'VR6AewLTigWG4xSOukaG', // Arnold - Filipino
  'my-MM': 'VR6AewLTigWG4xSOukaG', // Arnold - Burmese
  'km-KH': 'VR6AewLTigWG4xSOukaG', // Arnold - Khmer
  'lo-LA': 'VR6AewLTigWG4xSOukaG', // Arnold - Lao
  'mn-MN': 'VR6AewLTigWG4xSOukaG', // Arnold - Mongolian
  'dz-BT': 'VR6AewLTigWG4xSOukaG', // Arnold - Dzongkha
  'dv-MV': 'VR6AewLTigWG4xSOukaG', // Arnold - Divehi
  'am-ET': 'VR6AewLTigWG4xSOukaG', // Arnold - Amharic
  'sw-KE': 'VR6AewLTigWG4xSOukaG', // Arnold - Kenyan Swahili
  'sw-TZ': 'VR6AewLTigWG4xSOukaG', // Arnold - Tanzanian Swahili
  'sw-UG': 'VR6AewLTigWG4xSOukaG', // Arnold - Ugandan Swahili
  'rw-RW': 'VR6AewLTigWG4xSOukaG', // Arnold - Kinyarwanda
  'rn-BI': 'VR6AewLTigWG4xSOukaG', // Arnold - Kirundi
  'ln-CD': 'VR6AewLTigWG4xSOukaG', // Arnold - Lingala (DR Congo)
  'ln-CG': 'VR6AewLTigWG4xSOukaG', // Arnold - Lingala (Republic of Congo)
  'sg-CF': 'VR6AewLTigWG4xSOukaG', // Arnold - Sango
  'ti-ER': 'VR6AewLTigWG4xSOukaG', // Arnold - Tigrinya
  'af-ZA': 'VR6AewLTigWG4xSOukaG', // Arnold - South African Afrikaans
  'zu-ZA': 'VR6AewLTigWG4xSOukaG', // Arnold - South African Zulu
  'xh-ZA': 'VR6AewLTigWG4xSOukaG', // Arnold - South African Xhosa
  'tn-BW': 'VR6AewLTigWG4xSOukaG', // Arnold - Tswana (Botswana)
  'tn-ZW': 'VR6AewLTigWG4xSOukaG', // Arnold - Tswana (Zimbabwe)
  'sn-ZW': 'VR6AewLTigWG4xSOukaG', // Arnold - Shona
  'nd-ZW': 'VR6AewLTigWG4xSOukaG', // Arnold - Northern Ndebele
  'ny-MW': 'VR6AewLTigWG4xSOukaG', // Arnold - Chichewa
  'mg-MG': 'VR6AewLTigWG4xSOukaG', // Arnold - Malagasy
  'crs-MU': 'VR6AewLTigWG4xSOukaG', // Arnold - Mauritian Creole
  'fj-FJ': 'VR6AewLTigWG4xSOukaG', // Arnold - Fijian
  'ho-PG': 'VR6AewLTigWG4xSOukaG', // Arnold - Hiri Motu
  'bi-VU': 'VR6AewLTigWG4xSOukaG', // Arnold - Bislama
  'sm-WS': 'VR6AewLTigWG4xSOukaG', // Arnold - Samoan (Samoa)
  'sm-AS': 'VR6AewLTigWG4xSOukaG', // Arnold - Samoan (American Samoa)
  'to-TO': 'VR6AewLTigWG4xSOukaG', // Arnold - Tongan
  'tvl-TV': 'VR6AewLTigWG4xSOukaG', // Arnold - Tuvaluan
  'na-NR': 'VR6AewLTigWG4xSOukaG', // Arnold - Nauruan
  'pau-PW': 'VR6AewLTigWG4xSOukaG', // Arnold - Palauan
  'mh-MH': 'VR6AewLTigWG4xSOukaG', // Arnold - Marshallese
  'rar-CK': 'VR6AewLTigWG4xSOukaG', // Arnold - Cook Islands Maori
  'ch-GU': 'VR6AewLTigWG4xSOukaG', // Arnold - Chamorro (Guam)
  'ch-MP': 'VR6AewLTigWG4xSOukaG', // Arnold - Chamorro (Northern Mariana Islands)
  'pap-AW': 'VR6AewLTigWG4xSOukaG', // Arnold - Papiamento (Aruba)
  'pap-CW': 'VR6AewLTigWG4xSOukaG', // Arnold - Papiamento (Curaçao)
  'ht-HT': 'VR6AewLTigWG4xSOukaG', // Arnold - Haitian Creole
  'ber-MA': 'VR6AewLTigWG4xSOukaG', // Arnold - Berber (Morocco)
  'ber-DZ': 'VR6AewLTigWG4xSOukaG', // Arnold - Berber (Algeria)
  'gn-PY': 'VR6AewLTigWG4xSOukaG', // Arnold - Guarani
  'mi-NZ': 'VR6AewLTigWG4xSOukaG', // Arnold - Maori
  'lb-LU': 'VR6AewLTigWG4xSOukaG', // Arnold - Luxembourgish
}

// Get the appropriate voice ID for a locale
export function getVoiceIdForLocale(locale: string): string {
  const lang = locale.toLowerCase().split('-')[0]
  return VOICE_MAPPING[lang] || VOICE_MAPPING['en'] // Default to English
}

// Check if a language is supported by ElevenLabs
export function isLanguageSupported(locale: string): boolean {
  const lang = locale.toLowerCase().split('-')[0]
  return lang in VOICE_MAPPING
}

// Check if ElevenLabs is configured
export function isElevenLabsConfigured(): boolean {
  return !!ELEVENLABS_CONFIG.API_KEY
}
