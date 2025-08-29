import type { CountryLanguageMap, PhrasePack } from '../types'

const baseUrl: string = ((import.meta as any).env?.BASE_URL as string) || '/'

function withBase(path: string): string {
  const clean = path.replace(/^\//, '')
  return `${baseUrl}${clean}`
}

async function safeFetchJson<T>(path: string): Promise<T> {
  const response = await fetch(withBase(path), { cache: 'force-cache' })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  const contentType = response.headers.get('content-type') || ''
  try {
    if (!contentType.includes('json')) {
      // Try to detect HTML fallback content
      const text = await response.text()
      if (/<!doctype html>/i.test(text) || /<html/i.test(text)) {
        throw new Error('Received HTML instead of JSON')
      }
      // Attempt to parse anyway
      return JSON.parse(text)
    }
    return await response.json()
  } catch (err) {
    throw err instanceof Error ? err : new Error('Invalid JSON response')
  }
}

// Eagerly bundled fallbacks
const phraseModules = import.meta.glob('../data/phrases-*.json', { eager: true, import: 'default' }) as Record<string, PhrasePack>
const countryModules = import.meta.glob('../data/countryLanguages.json', { eager: true, import: 'default' }) as Record<string, CountryLanguageMap>

export async function fetchCountryLanguageMap(): Promise<CountryLanguageMap> {
  try {
    return await safeFetchJson<CountryLanguageMap>('/data/countryLanguages.json')
  } catch {
    const mod = countryModules['../data/countryLanguages.json']
    if (!mod) throw new Error('countryLanguages fallback missing')
    return mod
  }
}

export async function fetchPhrasePack(locale: string): Promise<PhrasePack> {
  // Prefer bundled packs first (ensures centralized source of truth)
  const key = `../data/phrases-${locale}.json`
  let pack = phraseModules[key]
  if (pack) return pack
  // Fallback to English bundled
  pack = phraseModules['../data/phrases-en.json']
  if (pack) return pack
  // Finally try public fetch
  return await safeFetchJson<PhrasePack>(`/data/phrases-${locale}.json`)
}

