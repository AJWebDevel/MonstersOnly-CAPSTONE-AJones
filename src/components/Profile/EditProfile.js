import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


export const EditProfile = () => {
    const localMonsterUser = localStorage.getItem("monster_user")
    const monsterUserObject = JSON.parse(localMonsterUser)

    const { daterId } = useParams()
    let [dater, update] = useState({
        username: "",
        age: "",
        location: ""
        //blueprint
    })
    let [topics, setTopics] = useState([])
    let [likes, setLikes] = useState({})
    let [dislikes, setDislikes] = useState({})
    const [like, updateLike] = useState({

        userId: parseInt(daterId),
        topicId: likes[0]?.topicId
    })

    const [dislike, updateDislike] = useState({
        userId: parseInt(daterId),
        topicId: dislikes[0]?.topicId
    })


    let navigate = useNavigate()

    useEffect(
        () => {

            fetch(`http://localhost:8088/daters?userId=${monsterUserObject.id}`)
                .then((res) => res.json())
                .then((data) => {
                    let daterObj = data[0]
                    update(daterObj)
                })
        },
        //empty dependency array watches for initial change
        [] // When this array is empty, you are observing initial component state
    )
    useEffect(
        () => {

            fetch(`http://localhost:8088/topics`)
                .then((res) => res.json())
                .then((topicsArray) => {
                    setTopics(topicsArray)
                })
        },

        []
    )

    useEffect(
        () => {

            fetch(`http://localhost:8088/likes?userId=${daterId}&_expand=topic`)
                .then((res) => res.json())
                .then((likesArray) => {
                    let likesObj = likesArray[0]
                    updateLike(likesObj)
                    setLikes(likesArray)
                })
        },

        []
    )

    useEffect(
        () => {

            fetch(`http://localhost:8088/dislikes?userId=${daterId}&_expand=topic`)
                .then((res) => res.json())
                .then((dislikeArray) => {
                    let dislikesObj = dislikeArray[0]
                    updateDislike(dislikesObj)
                    setDislikes(dislikeArray)
                })
        },

        []
    )


    const handleSaveButtonClick = (event) => {
        event.preventDefault()


        // TODO: Perform the fetch() to PUT the object to the API
        return fetch(`http://localhost:8088/daters/${dater.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dater)
        })

            .then(
                fetch(`http://localhost:8088/likes/${likes[0].id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(like)
                })
            )
            .then(
                fetch(`http://localhost:8088/dislikes/${dislikes[0].id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dislike)
                })

            )
            .then(navigate(`/Profile/${daterId}`))
    }











    return (
        <div className="flex font-crimson-text items-center justify-center text-center h-screen">
            <form className="updateDaterFor rounded m-10 p-20  border-4 border-Monster-Black-100 bg-Monster-Green">
                <h2 className="DaterForm__title text-3xl mb-3 -mt-10 underline font-semibold">Tell Us About Yourself!</h2>
                <fieldset >
                    <div key={dater.username} className="form-group">
                        <label htmlFor="description">User Name:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control  text-grey-darker text-sm  mb-2 rounded p-1 m-2"
                            placeholder="Enter user name here"
                            value={dater.username}
                            onChange={
                                (event) => {
                                    let copy = { ...dater }
                                    copy.username = event.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset >
                    <div key={dater.username} className="form-group">
                        <label htmlFor="age">Age:</label>
                        <input
                            required autoFocus
                            type="number"
                            className="form-control  text-grey-darker text-sm  mb-2 rounded p-1 m-2"
                            placeholder="How old are you?"
                            value={dater.age}
                            onChange={
                                (event) => {
                                    let copy = { ...dater }
                                    copy.age = parseInt(event.target.value)
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset >
                    <div key={dater.location} className="form-group">
                        <label htmlFor="location">Location:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control  text-grey-darker text-sm  mb-2 rounded p-1 m-2"
                            placeholder="Where do you live?"
                            value={dater.location}
                            onChange={
                                (event) => {
                                    let copy = { ...dater }
                                    copy.location = event.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset >
                    <div key={dater.imgURL} className="form-group">
                        <label htmlFor="description">Profile Picture:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control  text-grey-darker text-sm  mb-2 rounded p-1 m-2"
                            placeholder="Paste your image URL here"
                            value={dater.imgURL}
                            onChange={
                                (event) => {
                                    let copy = { ...dater }
                                    copy.imgURL = event.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group m-2">
                        <h3 className="text-lg">Choose Your Like: </h3>

                        <select name="likes"
                            className="rounded m-3 p-1"
                            onChange={
                                (event) => {
                                    let copy = { ...like }
                                    copy.topicId = parseInt(event.target.value)
                                    updateLike(copy)
                                }}>
                            <option value={likes.topicId}>{likes[0]?.topic?.text}</option>
                            {topics.map(
                                (topic) => {
                                    return (<option key={`like--${topic.id}`} value={topic.id}>{topic.text}</option>)

                                })}</select>

                    </div>
                </fieldset>

                <fieldset >
                    <div className="form-group m-2">
                        <h3 className="text-lg">Choose Your Dislike: </h3>
                        <select name="Dislike"
                            className="rounded p-1 m-3 "
                            onChange={
                                (event) => {
                                    let copy = { ...dislike }
                                    copy.topicId = parseInt(event.target.value)
                                    updateDislike(copy)
                                }}>
                            <option className="text-center" value={dislikes.id} >{dislikes[0]?.topic?.text}</option>
                            {topics.map(
                                (topic) => {
                                    return <option key={`dislike--${topic.id}`} value={topic.id}>{topic.text}</option>

                                })}</select>





                    </div>
                </fieldset>
                <button
                    onClick={(event) => {
                        handleSaveButtonClick(event)

                    }}
                    className="btn btn-primary bg-transparent   hover:font-semibold hover:underline py-.5 px-2 m-3 mt-10   border border-black hover:border-transparent rounded">
                    Save and Submit
                </button>
            </form >
        </div>
    )
}
