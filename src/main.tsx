import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { InitialLoader } from './components/layout/InitialLoader'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <>
    <InitialLoader />
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </>,
)
