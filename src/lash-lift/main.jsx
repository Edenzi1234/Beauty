import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/bellefair/400.css'
import '@fontsource/assistant/300.css'
import '@fontsource/assistant/400.css'
import '@fontsource/assistant/600.css'
import '../styles.css'
import LashLiftApp from './LashLiftApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LashLiftApp />
  </StrictMode>,
)
