import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { ContenidoProvider } from './context/Grupal.jsx'
import App from './App.jsx'
import './index.css'
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ContenidoProvider>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </ContenidoProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
