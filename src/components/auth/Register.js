import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./login.css"

export const Register = (props) => {
    const [customer, setCustomer] = useState({
        email: "",
        fullName: "",
        isStaff: false
    })
    const [dater, setDater] = useState({
        userId: customer.id,
        username: "",
        age: 0,
        location: "",
        imgURL: ""
    })
    let navigate = useNavigate()

    const registerNewUser = async () => {
        await fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        }).then(res => res.json()
        ).then(createdUser => {
            if (createdUser.hasOwnProperty("id")) {
                localStorage.setItem("monster_user", JSON.stringify({
                    id: createdUser.id,
                    isAdmin: createdUser.isAdmin
                }))
            }
        },
            await fetch("http://localhost:8088/daters", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dater)
            })
                .then(res => res.json())


                .then(navigate("/")))
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${customer.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateCustomer = (evt) => {
        const copy = { ...customer }
        copy[evt.target.id] = evt.target.value
        setCustomer(copy)
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
                    <input onChange={updateCustomer}
                        type="text" id="fullName" className="form-control"
                        placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateCustomer}
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
                    <label htmlFor="profilePicture"> Profile Picture </label>
                    <input onChange={updateDater}
                        type="profilePicture" id="profilePicture" className="form-control"
                        placeholder="Paste Your Image URL here" required />
                </fieldset>

                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

