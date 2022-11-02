import { Outlet, Route, Routes } from "react-router-dom";
import { LandingPage } from "../LandingPage/LandingPage";
import { ProfileContainer } from "../Profile/Profile";
import { UserList } from "../UserList/UserList";

export const AdminViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>

                    <Outlet />
                </>
            }>

                <Route path="UserList" element={<UserList />} />
                <Route path="Profile/:daterId" element={<ProfileContainer />} />
                <Route path="LandingPage" element={<LandingPage />} />
            </Route>
        </Routes>
    )
}