import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { DislikesFinder } from "./Dislike"
import { LikesFinder } from "./Like"

export const UserList = () => {
    const [daters, setDaters] = useState([])
    const [likes, setLikes] = useState([])
    const [dislikes, setDislikes] = useState([])
    const [likesWithTopic, setLikesWithTopic] = useState([])
    const [dislikesWithTopic, setDislikesWithTopic] = useState([])

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
        {
            daters.map(
                dater => {

                    return <>
                        <article className="individualDater">
                            <img src={dater.imgURL}
                                alt="daterPhoto" className="daterImg" />
                            <h3><Link to={`/Profile/${dater.userId}`}>{dater?.user?.fullName}</Link></h3>
                            <div>
                                Username: {dater.username}
                                Age: {dater.age}
                                Location: {dater.location}
                                Likes: <LikesFinder dater={dater} />

                                Dislikes: <DislikesFinder dater={dater} />
                                <button onClick={() => {
                                    fetch(`http://localhost:8088/daters?id={daterId}`, {
                                        method: "DELETE",

                                    })
                                }} className="deleteButton" > Delete</button >
                            </div>
                        </article>
                    </>
                })
        }
    </div>
    )
}