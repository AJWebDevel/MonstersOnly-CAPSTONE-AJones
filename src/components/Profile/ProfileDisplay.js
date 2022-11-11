import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"

import { EditProfile } from "./EditProfile"







export const ProfileDisplay = () => {
    const localMonsterUser = localStorage.getItem("monster_user")
    const monsterUserObj = JSON.parse(localMonsterUser)

    const { daterId } = useParams()

    const [daters, updateDaters] = useState([])
    const [likes, setLikes] = useState([])
    const [dislikes, setDislikes] = useState([])

    const navigate = useNavigate()


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

    useEffect(
        () => {
            fetch(`http://localhost:8088/likes?userId=${monsterUserObj.id}&_expand=topic`)
                .then(response => response.json())
                .then((data) => {
                    setLikes(data)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/dislikes?_expand=topic&userId=${monsterUserObj.id}`)
                .then(response => response.json())
                .then((data) => {
                    setDislikes(data)
                })
        },
        []
    )



    return (<div className=" grid-cols-2 mt-10 text-Monster-Black-100  ml-8 float-left w-1/4  rounded">
        {
            daters?.map(
                (dater) => {
                    if (parseInt(daterId) === monsterUserObj.id) {

                        return (<section key={dater.id} className="bg-Monster-Green text-center mr-2 rounded box-border border-2 border-Monster-Black-100">
                            <div className="flex  items-center justify-center">
                                <img src={dater.imgURL}
                                    alt="daterPhoto" className="rounded m-5 shadow-lg" />
                            </div>
                            <header className="text-2xl underline">{dater?.user?.fullName}</header>
                            <p>Age: {dater.age}</p>
                            <div className="likes"> Likes:
                                {likes.map(like => {
                                    return <p key={like.id}> {like?.topic?.text} </p>
                                })}
                            </div>
                            <div className="dislikes"> Dislikes:
                                {dislikes.map(dislike => {
                                    return <p key={dislike.id}> {dislike?.topic?.text} </p>
                                })}
                            </div>

                            <footer>Location: {dater.location}</footer>
                            <button className="content-right bg-transparent  hover:font-semibold hover:text-white py-.5 px-2 m-3  border border-black hover:border-transparent rounded"
                                onClick={() => {
                                    navigate("EditProfile")
                                }}>Edit Profile </button>
                        </section>)
                    } else {

                        return (<section key={dater.id} className="bg-Monster-Green p-2 shadow-md text-center rounded box-border border-2 border-Monster-Black-100">
                            <div className="flex  items-center justify-center ">
                                <img src={dater.imgURL}
                                    alt="daterPhoto" className="rounded m-5 shadow-lg" />
                            </div>
                            <header className="text-2xl underline">{dater?.user?.fullName}</header>
                            <p>Age: {dater.age}</p>
                            <div className="likes"> Likes:
                                {likes.map(like => {
                                    return <p key={like.id}> {like?.topic?.text} </p>
                                })}
                            </div>
                            <div className="dislikes"> Dislikes:
                                {dislikes.map(dislike => {
                                    return <p key={dislike.id}> {dislike?.topic?.text} </p>
                                })}
                            </div>

                            <footer>Location: {dater.location}</footer>



                        </section>)
                    }
                }
            )


        }
    </div>)
}

