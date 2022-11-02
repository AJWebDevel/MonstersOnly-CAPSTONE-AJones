import React, { useEffect, useState } from "react"


export const LikesFinder = ({ dater, likes, likesWithTopic }) => {
    const [filteredLikes, setFilteredLikes] = useState([])
    useEffect(
        () => {
            fetch(`http://localhost:8088/likes?_expand=topic&userId=${dater.userId}`)
                .then(response => response.json())
                .then((data) => {
                    setFilteredLikes(data)
                })
        },
        []
    )

    //return html representation of dater likes 
    return <>
        {
            filteredLikes.map(
                (like) => {
                    return <p key={like.id}> {like?.topic?.text} </p>
                }
            )
        }
    </>
}