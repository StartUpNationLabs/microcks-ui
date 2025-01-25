import Dashboard from "@/app/dashboard/page.tsx";
import LoginPage from "@/app/login/page.tsx";
import Services from "./app/service/page";
import {Route, Routes} from "react-router";
export default function App() {
    return (
        <Routes>
            <Route path="login"  element={<LoginPage/>}/>
            <Route path="dashboard" element={<Dashboard/>}>
              <Route path="services" element={<Services/>}/>
              <Route path="" element={<div>Homepage</div>}/>
            </Route>
            <Route path="*" element={<div>404</div>}/>
        </Routes>
    )
}
