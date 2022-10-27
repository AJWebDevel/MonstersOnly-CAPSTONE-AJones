import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"





export const ProfileDisplay = () => {
    const localMonsterUser = localStorage.getItem("monster_user")
    const monsterUserObj = JSON.parse(localMonsterUser)



    const [daters, updateDaters] = useState([])


    useEffect(
        () => {
            fetch(`http://localhost:8088/daters?_expand=user`)
                .then(res => res.json())
                .then((data) => {
                    const singleDater = data[0]
                    updateDaters(data)
                })
        },
        []
    )

    return (<div>
        {
            daters.map(
                (dater) => {
                    if (dater.id === monsterUserObj.id) {

                        return (<section className="customer">
                            <header>{dater?.user?.fullName}</header>
                            <footer>Age: {dater.age}</footer>
                        </section>)
                    } else {
                        return <header></header>
                    }
                }
            )
        }
        <button><Link to="/EditProfile">Edit Profile</Link></button>
    </div>)
}
