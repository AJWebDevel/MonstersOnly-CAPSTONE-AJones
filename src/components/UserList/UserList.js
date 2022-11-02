import { useEffect, useState, useSyncExternalStore } from "react"
import { Link, useFetcher } from "react-router-dom"
import { DislikesFinder } from "./Dislike"
import { LikesFinder } from "./Like"
import ".//matches.css"

export const UserList = () => {
    const [daters, setDaters] = useState([])
    const [likes, setLikes] = useState([])
    const [dislikes, setDislikes] = useState([])
    const [likesWithTopic, setLikesWithTopic] = useState([])
    const [dislikesWithTopic, setDislikesWithTopic] = useState([])

    const localMonsterUser = localStorage.getItem("monster_user")
    const monsterUserObj = JSON.parse(localMonsterUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/daters?_expand=user`)
                .then(response => response.json())
                .then((datersArray) => {
                    setDaters(datersArray)
                })
        },
        []
    )
    useEffect(
        () => {
            fetch(`http://localhost:8088/likes?_expand=user`)
                .then(response => response.json())
                .then((likesArray) => {
                    setLikes(likesArray)
                })
        },
        []
    )
    useEffect(
        () => {
            fetch(`http://localhost:8088/dislikes?_expand=user`)
                .then(response => response.json())
                .then((dislikesArray) => {
                    setDislikes(dislikesArray)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/dislikes?_expand=topic`)
                .then(response => response.json())
                .then((dislikesWithTopicArray) => {
                    setDislikesWithTopic(dislikesWithTopicArray)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/likes?_expand=topic`)
                .then(response => response.json())
                .then((likesTopicsArray) => {
                    setLikesWithTopic(likesTopicsArray)
                })
        },
        []
    )



    return (<div className="datingUsers">
        <h2>User List</h2>
        <main className="backgroundBox">
            {
                daters.map(
                    dater => {

                        return <article key={dater.id} className="individualDater">
                            <div key={dater.userId} className="imgBackground">
                                <img src={dater.imgURL}
                                    alt="daterPhoto" className="daterImg" />
                            </div>
                            <h3><Link to={`/Profile/${dater.userId}`} className="daterName">{dater?.user?.fullName}</Link></h3>
                            <div className="bioInfo">
                                <p>Username: {dater.username}</p>
                                <p>Age: {dater.age}</p>
                                <p> Location: {dater.location}</p>
                                <div>Likes: <LikesFinder dater={dater} /></div>

                                <div>Dislikes: <DislikesFinder dater={dater} />
                                </div>
                                <button onClick={() => {
                                    fetch(`http://localhost:8088/daters/${dater.id}`, {
                                        method: "DELETE"
                                    })
                                        .then((newDaters) => {
                                            setDaters(newDaters)
                                        })
                                        .then(() => {
                                            fetch(`http://localhost:8088/daters?_expand=user`)
                                                .then(res => res.json())
                                                .then((newData) => {
                                                    setDaters(newData)
                                                })
                                        })
                                }
                                } className="delete" > Delete</button>


                            </div>
                        </article>

                    })
            }
        </main>
    </div>
    )
}