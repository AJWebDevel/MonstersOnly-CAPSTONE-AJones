import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"





export const ProfileDisplay = () => {
    const localMonsterUser = localStorage.getItem("monster_user")
    const monsterUserObj = JSON.parse(localMonsterUser)

    const { daterId } = useParams()

    const [daters, updateDaters] = useState([])


    useEffect(
        () => {
            fetch(`http://localhost:8088/daters?_expand=user&userId=${daterId}`)
                .then(res => res.json())
                .then((data) => {
                    updateDaters(data)
                })
        },
        []
    )



    return (<div>
        {
            daters.map(
                (dater) => {
                    if (daterId !== monsterUserObj.id) {

                        return (<section className="customer">
                            <header>{dater?.user?.fullName}</header>
                            <footer>Age: {dater.age}</footer>
                        </section>)
                    } else {

                        return (<section className="customer">
                            <header>{dater?.user?.fullName}</header>
                            <footer>Age: {dater.age}</footer>
                            <button><Link to="/EditProfile">Edit Profile</Link></button>
                        </section>)
                    }
                }
            )
        }
    </div>)
}
