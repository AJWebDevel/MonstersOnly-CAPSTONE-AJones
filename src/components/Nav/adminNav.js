import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const AdminNav = () => {
    const navigate = useNavigate()

    return (<div className="bg-Monster-Black-100   text-white w-screen">
        <ul className="flow-root ">
            <div className="float-left">
                <h3 className=" m-4 content-center">Monsters Only</h3>
            </div>
            <div className="float-right m-3 mr-10 ">
                <li className="navbar__item active content-center mr-3 ml-3 hover:font-semibold hover:text-Monster-Green">
                    <Link className="navbar__link" to="/UserList">User List</Link>
                </li>
                <li className="navbar__item active mr-3 ml-3 hover:font-semibold hover:text-Monster-Green">
                    <Link className="navbar__link" to="/LandingPage">MainPage</Link>
                </li>
                <li className="navbar__item active mr-3 ml-3 hover:font-semibold hover:text-Monster-Green">
                    <Link className="navbar__link" to="/MeetUps">Monster Meets</Link>
                </li>
                {
                    localStorage.getItem("monster_user")
                        ? <li className="navbar__item navbar__logout mr-3 ml-3 hover:font-semibold hover:text-Monster-Green">
                            <Link className="navbar__link" to="" onClick={() => {
                                localStorage.removeItem("monster_user")
                                navigate("/LandingPage", { replace: true })
                            }}>Logout</Link>
                        </li>
                        : ""
                }
            </div>

        </ul>
    </div>
    )
}

