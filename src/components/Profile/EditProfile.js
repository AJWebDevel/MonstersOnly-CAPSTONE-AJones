import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const EditProfile = () => {
    const localMonsterUser = localStorage.getItem("monster_user")
    const monsterUserObject = JSON.parse(localMonsterUser)

    const [dater, update] = useState({
        username: "",
        age: "",
        location: ""
        //blueprint
    })
    const [like, setLike] = useState({
        userId: monsterUserObject.id,
        topicId: 0
    })

    const [dislike, setDislike] = useState({
        userId: monsterUserObject.id,
        topicId: 0
    })
    const [topics, setTopics] = useState([])


    let navigate = useNavigate

    useEffect(
        () => {

            fetch(`http://localhost:8088/daters?userId=${monsterUserObject.id}`)
                .then((res) => res.json())
                .then((data) => {
                    const daterObj = data[0]
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
        //empty dependency array watches for initial change
        [] // When this array is empty, you are observing initial component state
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()


        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/daters/${dater.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dater)
        })
            .then(res => res.json)
            .then(handleDislikeTopicChanges(event),
                handleLikeTopicChanges(event))

    }

    const handleLikeTopicChanges = () => {



        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/likes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(like)
        })
            .then(res => res.json)

    }
    const handleDislikeTopicChanges = () => {



        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/dislikes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dislike)
        })
            .then(res => res.json)

    }

    return (
        <form className="updateDaterForm">
            <h2 className="DaterForm__title">Tell Us About Yourself!</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">User Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter user name here"
                        value={dater.username}
                        onChange={
                            (event) => {
                                const copy = { ...dater }
                                copy.username = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="age">Age:</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="How old are you?"
                        value={dater.age}
                        onChange={
                            (event) => {
                                const copy = { ...dater }
                                copy.age = parseInt(event.target.value)
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Location:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Where do you live?"
                        value={dater.location}
                        onChange={
                            (event) => {
                                const copy = { ...dater }
                                copy.location = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Profile Picture:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Paste your image URL here"
                        value={dater.imgURL}
                        onChange={
                            (event) => {
                                const copy = { ...dater }
                                copy.imgURL = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <h3>Choose Your First Like </h3>
                    {topics.map(
                        (topic) => {
                            return (<>
                                <input type="checkbox" value={topic.id} name="{topic.text}"
                                    onChange={
                                        (event) => {
                                            const copy = { ...like }
                                            copy.topicId = event.target.value
                                            setLike(copy)
                                        }}
                                    onClick={
                                        handleLikeTopicChanges()
                                    } />
                                <label htmlFor="like">{topic.text}</label>
                            </>)
                        })}
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <h3>Choose Your First Dislike </h3>
                    {topics.map(
                        (topic) => {
                            return (<>
                                <input type="checkbox" value={topic.id} name="{topic.text}"
                                    onChange={
                                        (event) => {
                                            const copy = { ...dislike }
                                            copy.topicId = event.target.value
                                            setDislike(copy)
                                        }}
                                />
                                <label htmlFor="dislike">{topic.text}</label>
                            </>)
                        })}
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save & Submit
            </button>
        </form >
    )
}
