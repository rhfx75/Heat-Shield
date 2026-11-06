import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './graphics/graphics.css'
import App from './App'
import { initLenisGSAP } from './graphics/motion'

if (typeof window !== 'undefined') void initLenisGSAP()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
