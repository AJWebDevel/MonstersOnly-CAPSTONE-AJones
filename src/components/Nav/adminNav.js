import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const AdminNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/UserList">User List</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/LandingPage">MainPage</Link>
            </li>
            {
                localStorage.getItem("monster_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("monster_user")
                            navigate("/", { replace: true })
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}

