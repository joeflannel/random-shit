import { useEffect, useMemo, useState } from 'react'
import { fetchCountryLanguageMap } from '../utils/data'
import { setSelectedCountryCode, getSelectedCountryCode } from '../utils/storage'
import { useNavigate } from 'react-router-dom'
import { t, getUILanguage } from '../utils/i18n'
import type { CountryLanguageMap } from '../types'
import { SUPPORTED_PHRASE_LOCALES, getEffectiveLocaleForCountry } from '../utils/fallbacks'

interface CountryOption {
  code: string
  name: string
  hasNativePhrases: boolean
  fallbackLanguage?: string
}

interface EnrichedCountryOption extends CountryOption {
  effectiveLocale: string
  isNative: boolean
}

const LANGUAGE_LABELS: Record<string, string> = {
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  it: 'Italian',
  pt: 'Portuguese',
  ru: 'Russian',
  ja: 'Japanese',
  zh: 'Chinese',
  hi: 'Hindi'
}

const DEFAULT_COUNTRIES: CountryOption[] = [
  // North America
  { code: 'US', name: 'United States', hasNativePhrases: true },
  { code: 'CA', name: 'Canada', hasNativePhrases: true },
  { code: 'MX', name: 'Mexico', hasNativePhrases: true },
  
  // Europe
  { code: 'GB', name: 'United Kingdom', hasNativePhrases: true },
  { code: 'FR', name: 'France', hasNativePhrases: true },
  { code: 'ES', name: 'Spain', hasNativePhrases: true },
  { code: 'DE', name: 'Germany', hasNativePhrases: true },
  { code: 'IT', name: 'Italy', hasNativePhrases: true },
  { code: 'RU', name: 'Russia', hasNativePhrases: true },
  { code: 'PT', name: 'Portugal', hasNativePhrases: true },
  { code: 'CH', name: 'Switzerland', hasNativePhrases: true },
  { code: 'AT', name: 'Austria', hasNativePhrases: true },
  { code: 'IE', name: 'Ireland', hasNativePhrases: true },
  { code: 'LI', name: 'Liechtenstein', hasNativePhrases: true },
  { code: 'MC', name: 'Monaco', hasNativePhrases: true },
  { code: 'SM', name: 'San Marino', hasNativePhrases: true },
  { code: 'VA', name: 'Vatican City', hasNativePhrases: true },
  
  // Asia
  { code: 'CN', name: 'China', hasNativePhrases: true },
  { code: 'JP', name: 'Japan', hasNativePhrases: true },
  { code: 'IN', name: 'India', hasNativePhrases: true },
  { code: 'SG', name: 'Singapore', hasNativePhrases: true },
  
  // Africa (primary language maps to existing packs)
  { code: 'UG', name: 'Uganda', hasNativePhrases: true },
  { code: 'CD', name: 'DR Congo', hasNativePhrases: true },
  { code: 'CG', name: 'Republic of Congo', hasNativePhrases: true },
  { code: 'GA', name: 'Gabon', hasNativePhrases: true },
  { code: 'CM', name: 'Cameroon', hasNativePhrases: true },
  { code: 'NG', name: 'Nigeria', hasNativePhrases: true },
  { code: 'GH', name: 'Ghana', hasNativePhrases: true },
  { code: 'CI', name: 'Ivory Coast', hasNativePhrases: true },
  { code: 'SN', name: 'Senegal', hasNativePhrases: true },
  { code: 'ML', name: 'Mali', hasNativePhrases: true },
  { code: 'BF', name: 'Burkina Faso', hasNativePhrases: true },
  { code: 'NE', name: 'Niger', hasNativePhrases: true },
  { code: 'CF', name: 'Central African Republic', hasNativePhrases: true },
  { code: 'SS', name: 'South Sudan', hasNativePhrases: true },
  { code: 'NA', name: 'Namibia', hasNativePhrases: true },
  { code: 'BW', name: 'Botswana', hasNativePhrases: true },
  { code: 'ZW', name: 'Zimbabwe', hasNativePhrases: true },
  { code: 'ZM', name: 'Zambia', hasNativePhrases: true },
  { code: 'MW', name: 'Malawi', hasNativePhrases: true },
  { code: 'MZ', name: 'Mozambique', hasNativePhrases: true },
  { code: 'SZ', name: 'Eswatini', hasNativePhrases: true },
  { code: 'LS', name: 'Lesotho', hasNativePhrases: true },
  { code: 'MU', name: 'Mauritius', hasNativePhrases: true },
  { code: 'SC', name: 'Seychelles', hasNativePhrases: true },
  { code: 'CV', name: 'Cape Verde', hasNativePhrases: true },
  { code: 'GW', name: 'Guinea-Bissau', hasNativePhrases: true },
  { code: 'GN', name: 'Guinea', hasNativePhrases: true },
  { code: 'SL', name: 'Sierra Leone', hasNativePhrases: true },
  { code: 'LR', name: 'Liberia', hasNativePhrases: true },
  { code: 'TG', name: 'Togo', hasNativePhrases: true },
  { code: 'BJ', name: 'Benin', hasNativePhrases: true },
  { code: 'ST', name: 'São Tomé and Príncipe', hasNativePhrases: true },
  { code: 'GQ', name: 'Equatorial Guinea', hasNativePhrases: true },
  { code: 'AO', name: 'Angola', hasNativePhrases: true },
  
  // South America
  { code: 'BR', name: 'Brazil', hasNativePhrases: true },
  { code: 'AR', name: 'Argentina', hasNativePhrases: true },
  { code: 'CL', name: 'Chile', hasNativePhrases: true },
  { code: 'PE', name: 'Peru', hasNativePhrases: true },
  { code: 'CO', name: 'Colombia', hasNativePhrases: true },
  { code: 'VE', name: 'Venezuela', hasNativePhrases: true },
  { code: 'EC', name: 'Ecuador', hasNativePhrases: true },
  { code: 'BO', name: 'Bolivia', hasNativePhrases: true },
  { code: 'PY', name: 'Paraguay', hasNativePhrases: true },
  { code: 'UY', name: 'Uruguay', hasNativePhrases: true },
  { code: 'GY', name: 'Guyana', hasNativePhrases: true },
  { code: 'FK', name: 'Falkland Islands', hasNativePhrases: true },
  
  // Oceania
  { code: 'AU', name: 'Australia', hasNativePhrases: true },
  { code: 'NZ', name: 'New Zealand', hasNativePhrases: true },
  { code: 'FJ', name: 'Fiji', hasNativePhrases: true },
  { code: 'PG', name: 'Papua New Guinea', hasNativePhrases: true },
  { code: 'SB', name: 'Solomon Islands', hasNativePhrases: true },
  { code: 'NC', name: 'New Caledonia', hasNativePhrases: true },
  { code: 'PF', name: 'French Polynesia', hasNativePhrases: true },
  { code: 'KI', name: 'Kiribati', hasNativePhrases: true },
  { code: 'TV', name: 'Tuvalu', hasNativePhrases: true },
  { code: 'NR', name: 'Nauru', hasNativePhrases: true },
  { code: 'PW', name: 'Palau', hasNativePhrases: true },
  { code: 'MH', name: 'Marshall Islands', hasNativePhrases: true },
  { code: 'FM', name: 'Micronesia', hasNativePhrases: true },
  { code: 'CK', name: 'Cook Islands', hasNativePhrases: true },
  { code: 'NU', name: 'Niue', hasNativePhrases: true },
  { code: 'TK', name: 'Tokelau', hasNativePhrases: true },
  { code: 'AS', name: 'American Samoa', hasNativePhrases: true },
  { code: 'GU', name: 'Guam', hasNativePhrases: true },
  { code: 'MP', name: 'Northern Mariana Islands', hasNativePhrases: true }
]

export default function CountryPicker() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [mapLoaded, setMapLoaded] = useState(false)
  const [countryMap, setCountryMap] = useState<CountryLanguageMap>({})

  useEffect(() => {
    fetchCountryLanguageMap().then((m) => setCountryMap(m)).finally(() => setMapLoaded(true))
  }, [])

  useEffect(() => {
    const saved = getSelectedCountryCode()
    if (saved) {
      setSelectedCountryCode(saved)
    }
  }, [])

  const enriched = useMemo<EnrichedCountryOption[]>(() => {
    const list: EnrichedCountryOption[] = []
    for (const c of DEFAULT_COUNTRIES) {
      const langs = (countryMap[c.code] || []).map(l => (l || '').toLowerCase())
      const primary = (langs[0] || '')
      const supported = langs.filter(l => SUPPORTED_PHRASE_LOCALES.has(l))
      if (supported.length > 0) {
        for (const locale of supported) {
          const isNative = locale === primary
          list.push({
            ...c,
            hasNativePhrases: isNative,
            fallbackLanguage: isNative ? undefined : locale,
            effectiveLocale: locale,
            isNative
          })
        }
      } else {
        const effective = getEffectiveLocaleForCountry(c.code, countryMap)
        list.push({
          ...c,
          hasNativePhrases: false,
          fallbackLanguage: effective,
          effectiveLocale: effective,
          isNative: false
        })
      }
    }
    return list
  }, [countryMap])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const base = enriched
    if (!q) return base
    return base.filter(c => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q))
  }, [query, enriched])

  const grouped = useMemo(() => {
    const uiBase = getUILanguage().split('-')[0].toLowerCase()
    const groups = new Map<string, EnrichedCountryOption[]>()
    for (const c of filtered) {
      const arr = groups.get(c.effectiveLocale) || []
      arr.push(c)
      groups.set(c.effectiveLocale, arr)
    }
    const arr = Array.from(groups.entries()).map(([locale, items]) => ({ locale, items }))
    return arr.filter(g => (g.locale || '').toLowerCase() !== uiBase)
  }, [filtered])

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({})
  const toggleGroup = (locale: string) => setOpenGroups((s) => {
    const current = Object.prototype.hasOwnProperty.call(s, locale) ? s[locale] : false
    return { ...s, [locale]: !current }
  })

  const totalCountries = DEFAULT_COUNTRIES.length
  const visibleCountries = useMemo(() => {
    const codes = new Set<string>()
    for (const group of grouped) {
      for (const item of group.items) codes.add(item.code)
    }
    return codes.size
  }, [grouped])

  const comingSoonCountries = useMemo(() => {
    // Countries whose primary languages are not in supported packs
    const unsupported = Object.keys(countryMap).filter((code) => {
      const langs = countryMap[code] || []
      const primary = (langs[0] || '').toLowerCase()
      return !['en','es','fr','de','it','pt','ru','ja','zh','hi'].includes(primary)
    })
    // Show a curated subset for now
    const preferred = ['SE','NO','DK','PL','CZ','HU','RO','BG','GR','TR','KR','TH','VN','ID','MY','PH','PK','IR','IQ','EG','MA','DZ','TN','LY','ET','KE','TZ','ZA']
    const set = new Set(preferred)
    const list = unsupported.filter(c => set.has(c)).slice(0, 50)
    return list
  }, [countryMap])

  function handleSelect(code: string) {
    setSelectedCountryCode(code)
    navigate(`/phrases/${code}`)
  }

  return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: 16 }}>
      <h1 style={{ fontSize: 24, marginBottom: 12 }}>{t('selectCountry')}</h1>
      
      {/* Legend explaining the phrase pack system */}
      <div style={{ 
        background: 'linear-gradient(135deg, #e0f2fe, #ffedd5)', 
        border: '1px solid #e5e7eb', 
        borderRadius: '12px', 
        padding: '16px', 
        marginBottom: '20px',
        fontSize: '14px',
        boxShadow: '0 10px 25px rgba(2, 132, 199, 0.08)'
      }}>
        <h3 style={{ marginTop: 0, marginBottom: '12px', fontSize: '16px' }}>📚 Phrase Pack System</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#059669', fontWeight: 'bold' }}>🟢 Native Phrases</span>
            <span style={{ opacity: 0.7 }}>- Countries with complete phrase packs in their local language</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#f97316', fontWeight: 'bold' }}>🟠 Fallback Phrases</span>
            <span style={{ opacity: 0.7 }}>- Countries using phrases from similar languages (e.g., Spanish for Mexico)</span>
          </div>
        </div>
      </div>
      
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t('searchCountries')}
        style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginBottom: 12 }}
      />
      {!mapLoaded && <div>{t('loading')}</div>}
      
      {mapLoaded && (
        <div style={{ marginBottom: '12px', fontSize: '14px', opacity: 0.7 }}>
          Showing {visibleCountries} of {totalCountries} countries
        </div>
      )}
      
      {grouped.map(({ locale, items }) => {
        const open = Object.prototype.hasOwnProperty.call(openGroups, locale) ? openGroups[locale] : false
        return (
          <div key={locale} style={{ marginBottom: 16 }}>
            <button
              onClick={() => toggleGroup(locale)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: 12,
                borderRadius: 10,
                border: '1px solid #e5e7eb',
                background: '#ffffff',
                cursor: 'pointer',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 10
              }}
              aria-expanded={open}
              aria-controls={`group-${locale}`}
            >
              <span className="badge" style={{ background: '#eef2ff' }}>{(LANGUAGE_LABELS[locale] || locale.toUpperCase())}</span>
              <span style={{ opacity: 0.9 }}>{(LANGUAGE_LABELS[locale] || locale.toUpperCase())} phrase pack</span>
              <span style={{ marginLeft: 'auto', opacity: 0.6 }}>{open ? '▲' : '▼'}</span>
            </button>
            {open && (
              <ul id={`group-${locale}`} style={{ listStyle: 'none', padding: 0, margin: '8px 0 0 0' }}>
                {items.map((c) => (
                  <li key={c.code}>
                    <button
                      onClick={() => handleSelect(c.code)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: 12,
                        marginBottom: 8,
                        borderRadius: 10,
                        border: c.isNative ? '2px solid #059669' : '2px solid #dc2626',
                        background: c.isNative ? '#ecfdf5' : '#fff7ed',
                        cursor: 'pointer',
                        position: 'relative'
                      }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                          <strong>{c.name}</strong>
                          <span style={{ opacity: 0.6, marginLeft: 8 }}>({c.code})</span>
                          {!c.isNative && c.fallbackLanguage && (
                            <div style={{ 
                              fontSize: '12px', 
                              color: '#dc2626', 
                              marginTop: '4px',
                              fontStyle: 'italic'
                            }}>
                              Uses {(locale === 'en' ? 'US' : (locale === 'pt' ? 'BR' : locale.toUpperCase()))} phrases
                            </div>
                          )}
                        </div>
                        <div style={{ 
                          fontSize: '12px', 
                          fontWeight: 'bold',
                          color: c.isNative ? '#059669' : '#dc2626'
                        }}>
                          {c.isNative ? '🟢 Native' : '🔴 Fallback'}
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )
      })}

      {/* Coming soon languages accordion */}
      <div style={{ marginTop: 16 }}>
        <button
          onClick={() => toggleGroup('coming-soon')}
          style={{
            width: '100%',
            textAlign: 'left',
            padding: 10,
            borderRadius: 8,
            border: '1px solid #e5e7eb',
            background: '#fff7ed',
            cursor: 'pointer',
            fontWeight: 600
          }}
          aria-expanded={(openGroups['coming-soon'] ?? false)}
          aria-controls={'group-coming-soon'}
        >
          <span>Coming soon (more languages)</span>
          <span style={{ float: 'right', opacity: 0.7 }}>{(openGroups['coming-soon'] ?? false) ? '▲' : '▼'}</span>
        </button>
        {(openGroups['coming-soon'] ?? false) && (
          <ul id={'group-coming-soon'} style={{ listStyle: 'none', padding: 0, margin: '8px 0 0 0' }}>
            {comingSoonCountries.map((code) => (
              <li key={code}>
                <div style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: 12,
                  marginBottom: 8,
                  borderRadius: 8,
                  border: '2px dashed #f97316',
                  background: '#fff7ed'
                }}>
                  <strong>{code}</strong>
                  <span style={{ opacity: 0.6, marginLeft: 8 }}>(coming soon)</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {filtered.length === 0 && mapLoaded && (
        <div style={{ 
          textAlign: 'center', 
          padding: '24px', 
          opacity: 0.6,
          fontSize: '14px'
        }}>
          No countries found matching your search.
        </div>
      )}
    </div>
  )
}

