import { Outlet, Route, Routes } from "react-router-dom";
import { EditProfile } from "../Profile/EditProfile";
import { ProfileContainer } from "../Profile/Profile";
import { Matches } from "../UserList/Matches";

export const DaterViews = () => {
    const localMonsterUser = localStorage.getItem("monster_user")
    const monsterUserObj = JSON.parse(localMonsterUser)
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Monsters Only</h1>
                    <div>You don't have to be lonely...</div>

                    <Outlet />
                </>
            }>

                <Route path="Matches/Profile/:daterId" element={<ProfileContainer />} />
                <Route path="Profile/:daterId" element={<ProfileContainer />} />
                <Route path="EditProfile" element={<EditProfile />} />
                <Route path="Matches" element={<Matches />} />
            </Route>
        </Routes>
    )
}