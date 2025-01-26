import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { useKeycloak } from '@react-keycloak/web'
import { useNavigate } from 'react-router'
import { Outlet } from 'react-router'

export default function Dashboard() {
    // load user info

    // Using Object destructuring
    const { keycloak } = useKeycloak()
    const navigate = useNavigate()
    if (!keycloak.authenticated) {
        navigate('/login')
        return <div>Redirecting...</div>
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <Outlet />
        </SidebarProvider>
    )
}
