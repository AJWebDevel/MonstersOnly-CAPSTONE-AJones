import { useEffect, useState, useSyncExternalStore } from "react"
import { Link, useFetcher } from "react-router-dom"
import { DislikesFinder } from "./Dislike"
import { LikesFinder } from "./Like"
import "./matches.css"

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



    return (<div className="bg-Monster-Green grid-cols-3 text-Monster-Black-100 m-20 p-5 rounded">
        <h2 className="text-white text-center p-4 underline text-4xl m-6 ">User List</h2>
        <main className="">
            {
                daters.map(
                    dater => {

                        return <article key={dater.id} className="bg-Monster-Orange rounded m-3 shadow-md w-3/4 h-full">
                            <div key={dater.userId} className=" flex  items-center justify-center">
                                <img src={dater.imgURL}
                                    alt="daterPhoto" className="rounded m-5 shadow-lg" />
                            </div>
                            <div className="flex items-center justify-center">
                                <h3 className="text-center m-1   hover:underline"><Link to={`/Profile/${dater.userId}`} >{dater?.user?.fullName}</Link></h3>
                            </div>

                            <div className="m-4">
                                <p>Username: {dater.username}</p>
                                <p>Age: {dater.age}</p>
                                <p> Location: {dater.location}</p>
                                <div>Likes: <LikesFinder dater={dater} /></div>

                                <div>Dislikes: <DislikesFinder dater={dater} />
                                </div>
                                <div className="flex items-center justify-center">

                                    <button onClick={() => {
                                        fetch(`http://localhost:8088/daters/${dater.id}`, {
                                            method: "DELETE"
                                        })

                                            .then(() => {
                                                fetch(`http://localhost:8088/daters?_expand=user`)
                                                    .then(res => res.json())
                                                    .then((newData) => {
                                                        setDaters(newData)
                                                    })
                                            })
                                    }
                                    } className=" bg-transparent  hover:font-semibold hover:text-Monster-Green py-.5 px-2 m-3  border border-black hover:border-transparent rounded" > Delete</button>
                                </div>


                            </div>
                        </article>

                    })
            }
        </main>
    </div>
    )
}