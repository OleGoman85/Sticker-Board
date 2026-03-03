import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import StickersProvider from './context/StickersProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StickersProvider>
      <App />
    </StickersProvider>
  </StrictMode>,
)
