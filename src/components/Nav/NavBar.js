import { AdminNav } from "./adminNav"
import { DaterNav } from "./daterNav"
import "./NavBar.css"




export const NavBar = () => {

    const localMonsterUser = localStorage.getItem("monster_user")
    const monsterUserObj = JSON.parse(localMonsterUser)

    if (monsterUserObj.isAdmin) {
        return <>


            <AdminNav />
        </>
    }
    else {
        return <>

            <DaterNav />
        </>

    }


}
