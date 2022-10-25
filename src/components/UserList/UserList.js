import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const UserList = () => {
    const [daters, setDaters] = useState([])
    const [likes, setLikes] = useState([])
    const [dislikes, setDislikes] = useState([])

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

    return (<div className="datingUsers">
        <h2>User List</h2>
        {
            daters.map(
                dater => {
                    return <>
                        <article className="individualDater">
                            <img src={dater.imgURL}
                                alt="daterPhoto" className="daterImg" />
                            <h3><Link to="/Profile">{dater?.user?.fullName}</Link></h3>
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
                                        }
                                    }
                                )

                                }
                            </div>
                        </article>
                    </>
                })
        }
    </div>
    )
}