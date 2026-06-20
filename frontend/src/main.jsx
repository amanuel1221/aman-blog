import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // Added missing import
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'; // Added missing import

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <App />
       </AuthProvider>
    </BrowserRouter>
   
  </StrictMode>
)
