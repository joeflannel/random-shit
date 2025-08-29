export interface CountryLanguageMap {
  [countryIso3166Alpha2: string]: string[]
}

export interface Phrase {
  id: string
  category: string
  native: string
  translation: string
  sentenceNative?: string
  sentenceTranslation?: string
  transliteration?: string
}

export interface PhrasePack {
  locale: string
  phrases: Phrase[]
}

