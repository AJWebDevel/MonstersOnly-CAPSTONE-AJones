import { AdminNav } from "./AdminNav"
import { DaterNav } from "./DaterNav"
import "./NavBar.css"




export const NavBar = () => {

    const localMonsterUser = localStorage.getItem("monster_user")
    const monsterUserObj = JSON.parse(localMonsterUser)

    if (monsterUserObj.isAdmin = true) {
        return <AdminNav />
    }
    else {
        return <DaterNav />

    }


}
