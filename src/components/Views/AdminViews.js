import { Outlet, Route, Routes } from "react-router-dom";
import { LandingPage } from "../LandingPage/LandingPage";
import { CreateMeetUps } from "../MeetUps/CreateMeetUps";
import { MeetUps } from "../MeetUps/MeetUps";
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
                <Route path="MeetUps" element={<MeetUps />} />
                <Route path="MeetUps/CreateMeetUps" element={<CreateMeetUps />} />
            </Route>
        </Routes>
    )
}