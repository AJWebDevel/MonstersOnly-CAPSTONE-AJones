import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"


export const Login = () => {
    const [email, set] = useState("goldilocks@porridge.bowl")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("monster_user", JSON.stringify({
                        id: user.id,
                        isAdmin: user.isAdmin
                    }))

                    navigate("/LandingPage")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (<>

        <nav className="bg-Monster-Black-100  font-crimson-text sticky top-0 z-50 text-white w-screen">

            <div className="float-left">
                <h3 className="content-center m-2">Monsters Only</h3>
            </div>
            <div className="float-right m-3">
                <h4 className="content-center">Human Folks Just Don't Get It!</h4>
            </div>
        </nav>


        <main className="container--login border-Monster-Black-100 font-crimson-text border-4 bg-Monster-Green flex flex-col items-center justify-center m-20 rounded shadow-md">
            <section className="    ">
                <form className=" flow-route flex flex-col " onSubmit={handleLogin}>
                    <h1 className="text-4xl text-center underline m-4">Monsters Only</h1>

                    <fieldset className="text-center">
                        <h4 className="font-semibold text-2xl ">Please sign in</h4>
                        <label htmlFor="inputEmail" className="block text-grey-darker text-sm  mb-2"> Email address </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="shadow  border rounded w-full mb-2 p-2 text-grey-darker "
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit" className="bg-transparent float-right  hover:font-semibold hover:underline py-.5 px-2 m-3   border border-black hover:border-transparent rounded">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>

            <Link to="/register" className="m-8  bg-transparent  hover:font-semibold hover:underline py-.5 px-2 m-3   hover:border-transparent rounded">Not a member yet?</Link>

        </main>
    </>)
}

