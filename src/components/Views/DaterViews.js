import { Outlet, Route, Routes } from "react-router-dom";
import { EditProfile } from "../Profile/EditProfile";
import { ProfileContainer } from "../Profile/Profile";
import { Matches } from "../UserList/Matches";

export const DaterViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Monsters Only</h1>
                    <div>You don't have to be lonely...</div>

                    <Outlet />
                </>
            }>

                <Route path="Profile" element={<ProfileContainer />} />
                <Route path="EditProfile" element={<EditProfile />} />
                <Route path="Matches" element={<Matches />} />
            </Route>
        </Routes>
    )
}