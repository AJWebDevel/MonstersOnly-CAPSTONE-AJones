import { EditProfile } from "./EditProfile"
import { Matches } from "../UserList/Matches";
import { ProfileDisplay } from "./ProfileDisplay";
import { CreatePost } from "./Posts/CreatePosts";
import { DisplayPosts } from "./Posts/DisplayPosts";


export const ProfileContainer = () => {


    return <>
        <ProfileDisplay />

        <CreatePost />
        <DisplayPosts />

    </>
}


