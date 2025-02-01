import Dashboard from '@/app/dashboard/page.tsx'
import LoginPage from '@/app/login/page.tsx'
import Services from './app/dashboard/service/page'
import { Route, Routes } from 'react-router'
import { Homepage } from '@/app/dashboard/homepage/page.tsx'
import ThankYou from "@/components/multi-step-forms/sections/ThankYou.tsx";
import PersonalInfo from "@/components/multi-step-forms/sections/PersonalInfo.tsx";
import Addons from "@/components/multi-step-forms/sections/Addons.tsx";
import Plan from "@/components/multi-step-forms/sections/Plan.tsx";
import Summary from "@/components/multi-step-forms/sections/Summary.tsx";
import Step from "@/components/multi-step-forms/Step.tsx";
import useStore from "@/store/useStore.ts";
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
