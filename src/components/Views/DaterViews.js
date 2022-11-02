import { Outlet, Route, Routes } from "react-router-dom";
import { CreateProfile } from "../Profile/CreateProfile";
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

                    <Outlet />
                </>
            }>

                <Route path="Matches/Profile/:daterId" element={<ProfileContainer />} />
                <Route path="Profile/:daterId" element={<ProfileContainer />} />
                <Route path="Profile/:daterId/EditProfile" element={<EditProfile />} />
                <Route path="Matches" element={<Matches />} />
            </Route>
        </Routes>
    )
}