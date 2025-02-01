import Dashboard from '@/app/dashboard/page.tsx'
import LoginPage from '@/app/login/page.tsx'
import Services from './app/dashboard/service/page'
import { Route, Routes } from 'react-router'
import { Homepage } from '@/app/dashboard/homepage/page.tsx'
export default function App() {
    return (
        <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="dashboard" element={<Dashboard />}>
                <Route path="services" element={<Services />} />
                <Route path="" element={<Homepage />} />
            </Route>
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<div>404</div>} />
        </Routes>
    )
}
