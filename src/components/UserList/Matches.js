
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
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

    const navigate = useNavigate()

    const seenDaters =
        daters.filter((dater) => {
            return dater.userId !== monsterUserObj.id

        })


    return (<div className="bg-Monster-Green font-crimson-text grid-cols-3 text-Monster-Black-100 m-20 p-5 rounded">
        <h2 className=" text-center  font-semibold underline text-4xl m-6 p-4 ">Potential Matches</h2>
        <main className="">
            {
                seenDaters.map(
                    dater => {
                        return <div className="bg-Monster-Orange rounded  shadow-md w-3/4 h-full" key={dater.id}>
                            <article key={dater.id} className="individualDater">
                                <div className="flex  items-center justify-center">
                                    <img src={dater.imgURL}
                                        alt="daterPhoto" className="rounded m-5 shadow-lg" />
                                </div>
                                <div className=" m-4 ">
                                    <h3 className="text-center  hover:underline"><Link to={`Profile/${dater.userId}`}>{dater?.user?.fullName}</Link></h3>
                                    <div className="bioInfo">
                                        <p>Username: {dater.username}</p>
                                        <p>Age: {dater.age}</p>
                                        <p>Location: {dater.location}</p>
                                        <div>Likes: <LikesFinder dater={dater} /></div>

                                        <div>Dislikes: <DislikesFinder dater={dater} /></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <button onClick={() => {
                                        return window.alert(`Think this peron is a scream? \nShoot them a message at: ${dater?.user?.email}`)
                                    }}
                                        className="acceptButton bg-transparent  hover:font-semibold hover:text-Monster-Green py-.5 px-2 m-3  border border-black hover:border-transparent rounded" > Accept!</button >
                                </div>

                            </article>
                        </div>
                    })
            }
        </main>
    </div>
    )
}