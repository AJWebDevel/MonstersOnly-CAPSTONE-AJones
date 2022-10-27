import { DaterViews } from "./DaterViews"
import { AdminViews } from "./AdminViews"

export const ApplicationViews = () => {

    const localMonsterUser = localStorage.getItem("monster_user")
    const monsterUserObj = JSON.parse(localMonsterUser)

    if (monsterUserObj.isAdmin) {
        return <AdminViews />
    }
    else {
        return <DaterViews />

    }


}