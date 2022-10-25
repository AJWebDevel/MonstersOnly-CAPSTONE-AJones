import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const DaterNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/Profile">Profile</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/Matches">Matches</Link>
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

