import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '@/styles/globals.css'
import { BrowserRouter } from 'react-router'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import keycloak from '@/keyclaok.ts'

createRoot(document.getElementById('root')!).render(
    <ReactKeycloakProvider authClient={keycloak}>
        <StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </StrictMode>
    </ReactKeycloakProvider>
)
