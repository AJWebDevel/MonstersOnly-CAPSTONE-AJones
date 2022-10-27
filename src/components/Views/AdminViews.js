import { Outlet, Route, Routes } from "react-router-dom";
import { LandingPage } from "../LandingPage/LandingPage";
import { ProfileContainer } from "../Profile/Profile";
import { UserList } from "../UserList/UserList";

export const AdminViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Monsters Only</h1>
                    <div>You don't have to be lonely...</div>

                    <Outlet />
                </>
            }>

                <Route path="UserList" element={<UserList />} />
                <Route path="UserList/:daterId" element={<ProfileContainer />} />
                <Route path="LandingPage" element={<LandingPage />} />
            </Route>
        </Routes>
    )
}