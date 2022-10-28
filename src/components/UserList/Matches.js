
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { DislikesFinder } from "./Dislike"
import { LikesFinder } from "./Like"

export const Matches = () => {

    const [daters, setDaters] = useState([])
    const [likes, setLikes] = useState([])
    const [likesWithTopic, setLikesWithTopic] = useState([])
    const [dislikesWithTopic, setDislikesWithTopic] = useState([])
    const [dislikes, setDislikes] = useState([])

    const localMonsterUser = localStorage.getItem("monster_user")
    const monsterUserObj = JSON.parse(localMonsterUser)
    const { daterId } = useParams()


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
            fetch(`http://localhost:8088/likes?_expand=topic`)
                .then(response => response.json())
                .then((likesTopicsArray) => {
                    setLikesWithTopic(likesTopicsArray)
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


    const seenDaters =
        daters.filter((dater) => {
            return dater.userId !== monsterUserObj.id

        })


    return (<div className="datingUsers">
        <h2>Potential Matches</h2>
        {
            seenDaters.map(
                dater => {
                    return <>
                        <article className="individualDater">
                            <img src={dater.imgURL}
                                alt="daterPhoto" className="daterImg" />
                            <h3><Link to={`Profile/${dater.userId}`}>{dater?.user?.fullName}</Link></h3>
                            <div>
                                Username: {dater.username}
                                Age: {dater.age}
                                Location: {dater.location}
                                Likes: <LikesFinder dater={dater} />


                                Dislikes: <DislikesFinder dater={dater} />
                            </div>

                            <button className="acceptButton" > Accept!</button >
                            <button className="rejectButton" > Reject!</button >


                        </article>
                    </>
                })
        }
    </div>
    )
}