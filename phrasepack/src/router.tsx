import { createBrowserRouter } from 'react-router-dom'
import CountryPicker from './pages/CountryPicker'
import PhraseList from './pages/PhraseList'
import App from './App'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <CountryPicker /> },
      { path: 'phrases/:countryCode', element: <PhraseList /> }
    ]
  }
])

