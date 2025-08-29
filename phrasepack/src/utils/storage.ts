const SELECTED_COUNTRY_KEY = 'phrasepack.selectedCountry'
const LAST_PHRASE_ID_KEY = 'phrasepack.lastPhraseId'
const LOCALE_OVERRIDE_PREFIX = 'phrasepack.localeOverride.'

export function setSelectedCountryCode(countryCode: string): void {
  try {
    localStorage.setItem(SELECTED_COUNTRY_KEY, countryCode)
  } catch {}
}

export function getSelectedCountryCode(): string | null {
  try {
    return localStorage.getItem(SELECTED_COUNTRY_KEY)
  } catch {
    return null
  }
}

export function setLastViewedPhraseId(phraseId: string): void {
  try {
    localStorage.setItem(LAST_PHRASE_ID_KEY, phraseId)
  } catch {}
}

export function getLastViewedPhraseId(): string | null {
  try {
    return localStorage.getItem(LAST_PHRASE_ID_KEY)
  } catch {
    return null
  }
}

export function setLocaleOverrideForCountry(countryCode: string, locale: string): void {
  try {
    localStorage.setItem(LOCALE_OVERRIDE_PREFIX + countryCode.toUpperCase(), locale)
  } catch {}
}

export function getLocaleOverrideForCountry(countryCode: string): string | null {
  try {
    return localStorage.getItem(LOCALE_OVERRIDE_PREFIX + countryCode.toUpperCase())
  } catch {
    return null
  }
}

