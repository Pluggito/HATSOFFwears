import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HashRouter } from 'react-router-dom'
import ShopContextProvider from './Context/ShopContext.jsx'
// import ShopContextProvider from './Context/ShopContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
    <ShopContextProvider>
    <App />
    </ShopContextProvider>
    </HashRouter>
  </StrictMode>,
)
