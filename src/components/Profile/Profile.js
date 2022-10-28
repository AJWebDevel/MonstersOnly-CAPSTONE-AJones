import { EditProfile } from "./EditProfile"
import { Matches } from "../UserList/Matches";
import { ProfileDisplay } from "./ProfileDisplay";
import { CreatePost } from "./Posts/CreatePosts";
import { DisplayPosts } from "./Posts/DisplayPosts";
import { useParams } from "react-router-dom";



export const ProfileContainer = () => {
    const localMonsterUser = localStorage.getItem("monster_user")
    const monsterUserObj = JSON.parse(localMonsterUser)
    const { daterId } = useParams()


    if (monsterUserObj.isAdmin) {
        return <>
            <ProfileDisplay />

            <DisplayPosts />

        </>
    } else if (monsterUserObj.id == daterId) {
        return <>
            <ProfileDisplay />

            <CreatePost />
            <DisplayPosts />

        </>
    }
    return <>
        < ProfileDisplay />
        <DisplayPosts />
    </>
}


