import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter} from 'react-router-dom'
import ShopContextProvider from './Context/ShopContext.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <ShopContextProvider>
    <App />
    </ShopContextProvider>
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
