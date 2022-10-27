import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"



/* <h3><Link to="/Profile">{dater?.user?.fullName}</Link></h3>
<img src={dater.imgURL}
    alt="daterPhoto" className="daterImg" />
<div>
    Username: {dater.username}
    Age: {dater.age}
    Location: {dater.location}
    Likes: {likes.map(
        like => {
            if (dater.userId === like.userId) {
                <p>{like?.topic?.text}</p>
            }
        }
    )

    }

    Dislikes: {dislikes.map(
        dislike => {
            if (dater.userId === dislike.userId) {
                <p>{dislike?.topic?.text}</p>
            } */




export const ProfileDisplay = () => {
    const localMonsterUser = localStorage.getItem("monster_user")
    const monsterUserObj = JSON.parse(localMonsterUser)
    const { daterId } = monsterUserObj.id

    const [dater, updateDater] = useState({})
    const [daters, updateDaters] = useState([])


    useEffect(
        () => {
            fetch(`http://localhost:8088/daters?_expand=user`)
                .then(res => res.json())
                .then((data) => {
                    const singleDater = data[0]
                    updateDater(singleDater)
                    updateDaters(data)
                })
        },
        [daterId]
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
