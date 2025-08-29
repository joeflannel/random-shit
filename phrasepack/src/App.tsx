import { Outlet, Link } from 'react-router-dom'
import './App.css'
import { getUILanguage, setUILanguage, hasSavedUILanguage, t } from './utils/i18n'
import { useEffect, useState } from 'react'

export default function App() {
  const current = getUILanguage()
  const [showLangModal, setShowLangModal] = useState<boolean>(!hasSavedUILanguage())
  useEffect(() => {
    if (!hasSavedUILanguage()) {
      setShowLangModal(true)
    }
  }, [])
  return (
    <div>
      <header style={{ padding: 12, borderBottom: '1px solid #e5e7eb', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#0ea5e9', fontWeight: 700 }}>
            {t('appTitle')}
          </Link>
          <button
            onClick={() => setShowLangModal(true)}
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              background: 'white',
              cursor: 'pointer',
              fontWeight: '500'
            }}
            title="Change language"
          >
            {current.toUpperCase()}
          </button>
        </div>
      </header>
      {showLangModal && (
        <LanguageModal
          current={current}
          onSelect={(lang) => { setUILanguage(lang as any); setShowLangModal(false); location.reload() }}
        />
      )}
      <Outlet />
    </div>
  )
}

function LanguageModal({ current, onSelect }: { current: string, onSelect: (lang: string) => void }) {
  return (
    <div style={{
      position: 'fixed', 
      inset: 0, 
      background: 'rgba(0,0,0,0.5)',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      zIndex: 100
    }}>
      <div style={{ 
        background: 'white', 
        padding: '24px', 
        borderRadius: '12px', 
        minWidth: '360px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}>
        <h2 style={{ marginTop: 0, marginBottom: '8px', fontSize: '20px' }}>
          {t('chooseNativeLanguage')}
        </h2>
        <p style={{ marginTop: 0, marginBottom: '20px', opacity: 0.7, fontSize: '14px' }}>
          Select your native language to customize the app experience
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
          <button 
            onClick={() => onSelect('en')} 
            style={{ 
              padding: '12px 16px', 
              border: '1px solid #e5e7eb', 
              borderRadius: '8px', 
              background: current === 'en' ? '#eef2ff' : 'white',
              cursor: 'pointer',
              textAlign: 'left',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = current === 'en' ? '#e0e7ff' : '#f9fafb'}
            onMouseLeave={(e) => e.currentTarget.style.background = current === 'en' ? '#eef2ff' : 'white'}
          >
            🇺🇸 English
          </button>
          
          <button 
            onClick={() => onSelect('ru')} 
            style={{ 
              padding: '12px 16px', 
              border: '1px solid #e5e7eb', 
              borderRadius: '8px', 
              background: current === 'ru' ? '#eef2ff' : 'white',
              cursor: 'pointer',
              textAlign: 'left',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = current === 'ru' ? '#e0e7ff' : '#f9fafb'}
            onMouseLeave={(e) => e.currentTarget.style.background = current === 'ru' ? '#eef2ff' : 'white'}
          >
            🇷🇺 Русский
          </button>
          
          <button 
            onClick={() => onSelect('es')} 
            style={{ 
              padding: '12px 16px', 
              border: '1px solid #e5e7eb', 
              borderRadius: '8px', 
              background: current === 'es' ? '#eef2ff' : 'white',
              cursor: 'pointer',
              textAlign: 'left',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = current === 'es' ? '#e0e7ff' : '#f9fafb'}
            onMouseLeave={(e) => e.currentTarget.style.background = current === 'es' ? '#eef2ff' : 'white'}
          >
            🇪🇸 Español
          </button>
          
          <button 
            onClick={() => onSelect('zh')} 
            style={{ 
              padding: '12px 16px', 
              border: '1px solid #e5e7eb', 
              borderRadius: '8px', 
              background: current === 'zh' ? '#eef2ff' : 'white',
              cursor: 'pointer',
              textAlign: 'left',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = current === 'zh' ? '#e0e7ff' : '#f9fafb'}
            onMouseLeave={(e) => e.currentTarget.style.background = current === 'zh' ? '#eef2ff' : 'white'}
          >
            🇨🇳 中文
          </button>
          
          <button 
            onClick={() => onSelect('de')} 
            style={{ 
              padding: '12px 16px', 
              border: '1px solid #e5e7eb', 
              borderRadius: '8px', 
              background: current === 'de' ? '#eef2ff' : 'white',
              cursor: 'pointer',
              textAlign: 'left',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = current === 'de' ? '#e0e7ff' : '#f9fafb'}
            onMouseLeave={(e) => e.currentTarget.style.background = current === 'de' ? '#eef2ff' : 'white'}
          >
            🇩🇪 Deutsch
          </button>
        </div>
      </div>
    </div>
  )
}
