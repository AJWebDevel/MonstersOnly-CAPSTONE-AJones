import React, { useEffect, useState } from "react"


export const DislikesFinder = ({ dater }) => {
    const [filteredDislikes, setFilteredDislikes] = useState([])
    useEffect(
        () => {
            fetch(`http://localhost:8088/dislikes?_expand=topic&userId=${dater.userId}`)
                .then(response => response.json())
                .then((data) => {
                    setFilteredDislikes(data)
                })
        },
        []
    )

    //return html representation of dater likes 
    return <>
        {
            filteredDislikes.map(
                (dislike) => {

                    return <p key={dislike.id}> {dislike?.topic?.text} </p>
                }
            )
        }
    </>
}