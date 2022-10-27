import { EditProfile } from "./EditProfile"
import { Matches } from "../UserList/Matches";
import { ProfileDisplay } from "./ProfileDisplay";
import { CreatePost } from "./Posts/CreatePosts";
import { DisplayPosts } from "./Posts/DisplayPosts";


export const ProfileContainer = () => {
    const localMonsterUser = localStorage.getItem("monster_user")
    const monsterUserObj = JSON.parse(localMonsterUser)
    if (monsterUserObj.isAdmin) {
        return <>
            <ProfileDisplay />

            <DisplayPosts />

        </>
    }
    {
        return <>
            <ProfileDisplay />

            <CreatePost />
            <DisplayPosts />

        </>
    }
}


