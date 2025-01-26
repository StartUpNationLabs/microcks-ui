import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '@/styles/globals.css'
import { BrowserRouter } from 'react-router'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import keycloak from '@/keyclaok.ts'


import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <ReactKeycloakProvider authClient={keycloak}>
        <StrictMode>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                <App/>
                </QueryClientProvider>
            </BrowserRouter>
        </StrictMode>
    </ReactKeycloakProvider>
);
