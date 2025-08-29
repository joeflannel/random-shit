export const SUPPORTED_PHRASE_LOCALES = new Set([
  'en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'zh', 'hi'
])

export const PHRASE_PACK_FALLBACKS: Record<string, string> = {
  // Spanish-speaking
  'MX': 'es', 'AR': 'es', 'CL': 'es', 'PE': 'es', 'CO': 'es', 'VE': 'es', 'EC': 'es', 'BO': 'es', 'PY': 'es', 'UY': 'es',
  'CU': 'es', 'DO': 'es', 'PR': 'es', 'ES': 'es',
  // Portuguese-speaking
  'BR': 'pt', 'PT': 'pt', 'CV': 'pt', 'GW': 'pt', 'ST': 'pt', 'AO': 'pt', 'MZ': 'pt', 'GQ': 'pt',
  // French-speaking
  'FR': 'fr', 'BE': 'fr', 'CH': 'fr', 'MC': 'fr', 'NC': 'fr', 'PF': 'fr', 'GA': 'fr', 'CM': 'fr', 'CI': 'fr', 'SN': 'fr', 'ML': 'fr', 'BF': 'fr', 'NE': 'fr', 'TD': 'fr', 'CF': 'fr', 'BI': 'fr', 'CD': 'fr', 'CG': 'fr', 'RW': 'fr', 'DJ': 'fr', 'ER': 'fr', 'MG': 'fr', 'MU': 'fr', 'SC': 'fr', 'KM': 'fr', 'GF': 'fr', 'GP': 'fr', 'MQ': 'fr', 'BL': 'fr', 'MF': 'fr',
  // German-speaking
  'DE': 'de', 'AT': 'de', 'LI': 'de',
  // Italian-speaking
  'IT': 'it', 'SM': 'it', 'VA': 'it',
  // Russian-speaking (common learning target)
  'RU': 'ru', 'KZ': 'ru', 'KG': 'ru', 'TJ': 'ru', 'TM': 'ru', 'UZ': 'ru',
  // English-speaking
  'US': 'en', 'GB': 'en', 'CA': 'en', 'IE': 'en', 'AU': 'en', 'NZ': 'en', 'SG': 'en', 'NG': 'en', 'GH': 'en', 'UG': 'en', 'ZA': 'en', 'NA': 'en', 'BW': 'en', 'ZW': 'en', 'ZM': 'en', 'MW': 'en', 'FK': 'en', 'JM': 'en', 'TT': 'en', 'BB': 'en', 'GD': 'en', 'LC': 'en', 'VC': 'en', 'AG': 'en', 'KN': 'en', 'DM': 'en', 'BS': 'en', 'TC': 'en', 'KY': 'en', 'VG': 'en', 'VI': 'en', 'GY': 'en', 'SR': 'en', 'FJ': 'en', 'PG': 'en', 'SB': 'en',
  // Japanese/Chinese/Hindi (native packs)
  'JP': 'ja', 'CN': 'zh', 'IN': 'hi'
}

export function getEffectiveLocaleForCountry(code: string, map: Record<string, string[]>): string {
  const primary = (map[code] && map[code][0]) || ''
  if (SUPPORTED_PHRASE_LOCALES.has(primary)) return primary
  const fb = PHRASE_PACK_FALLBACKS[code]
  if (fb && SUPPORTED_PHRASE_LOCALES.has(fb)) return fb
  return 'en'
}

export function getPrimaryLanguageForCountry(code: string, map: Record<string, string[]>): string | null {
  const arr = map[code]
  return (arr && arr.length > 0) ? arr[0] : null
}

// Choose region-specific TTS locale for better voices
export function getTtsLocaleForCountry(baseLocale: string, countryCode: string): string {
  const cc = (countryCode || '').toUpperCase()
  const base = (baseLocale || '').toLowerCase()
  if (base === 'en') {
    // Prefer UK voice where requested/available
    if (cc === 'GB' || cc === 'AU' || cc === 'CA') return 'en-GB'
    return 'en-US'
  }
  if (base === 'es') {
    if (cc === 'ES') return 'es-ES'
    if (cc === 'MX') return 'es-MX'
    // Default to Mexican Spanish for LatAm
    return 'es-MX'
  }
  if (base === 'pt') {
    if (cc === 'BR') return 'pt-BR'
    return 'pt-PT'
  }
  return base
}

