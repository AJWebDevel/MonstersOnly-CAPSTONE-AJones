import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"



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

                    navigate("/LandingPage")
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

    return (<>
        <nav className="bg-Monster-Black-100 font-crimson-text  sticky top-0 z-50 text-white w-screen">

            <div className="float-left">
                <h3 className="content-center m-2 font-crimson-text">Monsters Only</h3>
            </div>
            <div className="float-right m-3">
                <h4 className="content-center ml-10">Human Folks Just Don't Get It!</h4>
            </div>
        </nav>

        <div className="flex font-crimson-text items-center justify-center text-center h-screen">
            <form className="form--login rounded m-10 p-20  border-4 border-Monster-Black-100 bg-Monster-Green" onSubmit={handleRegister}>
                <h1 className="text-2xl mb-3 -mt-10 underline font-semibold ">Please Register for Monsters Only Dating Service</h1>
                <fieldset>
                    <label htmlFor="fullName"> Full Name </label>
                    <input onChange={updateUser}
                        type="text" id="fullName" className="form-control  text-grey-darker text-sm  mb-2 rounded p-1 m-2"
                        placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateUser}
                        type="email" id="email" className="form-control text-grey-darker text-sm  mb-2 rounded p-1 m-2"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="userName"> User Name </label>
                    <input onChange={updateDater}
                        type="username" id="username" className="form-control  text-grey-darker text-sm  mb-2 rounded p-1 m-2"
                        placeholder="What would you like to be called?" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="age"> Age </label>
                    <input onChange={updateDater}
                        type="age" id="age" className="form-control text-grey-darker text-sm  mb-2 rounded p-1 m-2"
                        placeholder="How old are you?" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="location"> Location </label>
                    <input onChange={updateDater}
                        type="location" id="location" className="form-control  text-grey-darker text-sm  mb-2 rounded p-1 m-2"
                        placeholder="Where do you live?" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="imgURL"> Profile Picture </label>
                    <input onChange={updateDater}
                        type="imgURL" id="imgURL" className="form-control text-grey-darker text-sm  mb-2 rounded p-1 m-2"
                        placeholder="Paste Your Image URL here" required />
                </fieldset>
                <fieldset>
                    <div className="form-group m-2">
                        <h1>Choose Your Like </h1>

                        <select name="likes"
                            className="rounded  p-1"
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
                    <div className="form-group m-2">
                        <h1>Choose Your Dislike </h1>
                        <select name="Dislike"
                            className="rounded  p-1"
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
                    <button className="bg-transparent   hover:font-semibold hover:underline py-.5 px-2 m-3 mt-10   border border-black hover:border-transparent rounded" type="submit"> Register </button>
                </fieldset>
            </form>
        </div>
    </>
    )
}

