import { EditProfile } from "./EditProfile"
import { Matches } from "../UserList/Matches";
import { ProfileDisplay } from "./ProfileDisplay";


export const ProfileContainer = () => {


    return <>
        <ProfileDisplay />
        <EditProfile />
        <Matches />
    </>
}


