import Dashboard from '@/app/dashboard/page.tsx'
import LoginPage from '@/app/login/page.tsx'
import Services from './app/dashboard/service/page'
import { Route, Routes } from 'react-router'
import { Homepage } from '@/app/dashboard/homepage/page.tsx'
import PersonalInfo from '@/components/multi-step-forms/sections/PersonalInfo.tsx'
import Addons from '@/components/multi-step-forms/sections/Addons.tsx'
import Plan from '@/components/multi-step-forms/sections/Plan.tsx'
import Summary from '@/components/multi-step-forms/sections/Summary.tsx'
import Step from '@/components/multi-step-forms/Step.tsx'
import useStore from '@/store/useStore.ts'
import ServiceDetails from './app/dashboard/service-details/page'
export default function App() {
    const step = useStore((state) => state.step)
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
                    <main>
                        <section className="relative h-[172px] w-full bg-[url('/images/bg-sidebar-mobile.svg')] bg-no-repeat bg-cover lg:hidden">
                            <div className="flex justify-center pt-[37px] pb-[34px]">
                                <Step stepNumber={1} />
                                <Step stepNumber={2} />
                                <Step stepNumber={3} />
                                <Step stepNumber={4} />
                            </div>
                        </section>
                        {step === 1 && <PersonalInfo />}
                        {step === 2 && <Plan />}
                        {step === 3 && <Addons />}
                        {step === 4 && <Summary />}
                    </main>
                }
            />
            <Route path="*" element={<div>404</div>} />
        </Routes>
    )
}
