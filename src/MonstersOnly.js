import { Route, Routes } from "react-router-dom"
import "./MonstersOnly.css"
import { NavBar } from "./components/Nav/NavBar"
import { Register } from "./components/auth/register"
import { Login } from "./components/auth/login"
import { ApplicationViews } from "./components/Views/ApplicationViews"
import { Authorized } from "./components/Views/Authorized"

export const MonstersOnly = () => {
    return <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={
            <Authorized>
                <>
                    <NavBar />
                    <ApplicationViews />
                </>
            </Authorized>

        } />
    </Routes>
}