import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./login.css"


export const Register = (props) => {
    const localMonsterUser = localStorage.getItem("monster_user")
    const monsterUserObj = JSON.parse(localMonsterUser)

    const [user, setUser] = useState({
        email: "",
        fullName: "",
        isAdmin: false
    })
    const [dater, setDater] = useState({
        userId: 0,
        username: "",
        age: 0,
        location: "",
        imgURL: ""
    })

    const [like, setLike] = useState({
        userId: 0,
        topicId: 0
    })
    const [dislike, setDislike] = useState({
        userId: 0,
        topicId: 0
    })
    let [topics, setTopics] = useState([])


    let navigate = useNavigate()

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
    //function to post both user and dater
    const registerUserAndDater = () => {
        fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then((createdPerson) => {
                return fetch("http://localhost:8088/daters", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        ...dater,
                        userId: createdPerson.id
                    })
                })
            })
            .then(res => res.json())
            .then((daterObj) => {
                fetch(`http://localhost:8088/likes`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        ...like,
                        userId: daterObj.userId
                    })
                })

                fetch(`http://localhost:8088/dislikes`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        ...dislike,
                        userId: daterObj.userId
                    })
                })
            })
    }





    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerUserAndDater()

                    navigate("/")
                }
            })
    }

    //functions to update user&dater based on user input
    const updateUser = (evt) => {
        const copy = { ...user }
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }
    const updateDater = (evt) => {
        const copy = { ...dater }
        copy[evt.target.id] = evt.target.value
        setDater(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for Monsters Only Dating Service</h1>
                <fieldset>
                    <label htmlFor="fullName"> Full Name </label>
                    <input onChange={updateUser}
                        type="text" id="fullName" className="form-control"
                        placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateUser}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="userName"> User Name </label>
                    <input onChange={updateDater}
                        type="username" id="username" className="form-control"
                        placeholder="What would you like to be called?" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="age"> Age </label>
                    <input onChange={updateDater}
                        type="age" id="age" className="form-control"
                        placeholder="How old are you?" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="location"> Location </label>
                    <input onChange={updateDater}
                        type="location" id="location" className="form-control"
                        placeholder="Where do you live?" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="imgURL"> Profile Picture </label>
                    <input onChange={updateDater}
                        type="imgURL" id="imgURL" className="form-control"
                        placeholder="Paste Your Image URL here" required />
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <h3>Choose Your Like </h3>

                        <select name="likes"

                            onChange={
                                (event) => {
                                    let copy = { ...like }
                                    copy.topicId = parseInt(event.target.value)
                                    setLike(copy)
                                }}>
                            <option value={like.topicId}>{like[0]?.topic?.text}</option>
                            {topics.map(
                                (topic) => {
                                    return (<option key={`like--${topic.id}`} value={topic.id}>{topic.text}</option>)

                                })}</select>

                    </div>
                </fieldset>
                <fieldset >
                    <div className="form-group">
                        <h3>Choose Your Dislike </h3>
                        <select name="Dislike"

                            onChange={
                                (event) => {
                                    let copy = { ...dislike }
                                    copy.topicId = parseInt(event.target.value)
                                    setDislike(copy)

                                }}>
                            <option value={dislike.id} >{dislike[0]?.topic?.text}</option>
                            {topics.map(
                                (topic) => {
                                    return <option key={`dislike--${topic.id}`} value={topic.id}>{topic.text}</option>

                                })}

                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

