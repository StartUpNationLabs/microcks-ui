import Dashboard from '@/app/dashboard/page.tsx'
import LoginPage from '@/app/login/page.tsx'
import Services from './app/dashboard/service/page'
import { Route, Routes } from 'react-router'
import { Homepage } from '@/app/dashboard/homepage/page.tsx'
import useStore from "@/store/useStore.ts";
import ServiceDetails from "@/app/dashboard/service-details/page.tsx";
import {Form} from "@/Form.tsx";
export default function App() {
    const step = useStore((state) => state.step);
    return (
        <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="dashboard" element={<Dashboard />}>
                <Route path="services/:apiId" element={<ServiceDetails />} />
                <Route path="services" element={<Services />} />
                <Route path="" element={<Homepage />} />
            </Route>
            <Route path="/" element={<Dashboard />} />
            <Route
                path="/test"
                element={
                    <Form/>
                }
            />
            <Route path="*" element={<div>404</div>} />
        </Routes>
    )
}
