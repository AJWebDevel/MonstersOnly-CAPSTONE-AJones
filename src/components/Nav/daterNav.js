import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const DaterNav = () => {
    const navigate = useNavigate()
    const localMonsterUser = localStorage.getItem("monster_user")
    const monsterUserObj = JSON.parse(localMonsterUser)

    return (<div className="bg-Monster-Black-100   text-white w-screen">
        <ul className="navbar font-crimson-text flow-root">
            <h3 className=" ml-4 title float-left">Monsters Only</h3>
            <div className="float-right m-3 mr-10">
                <li className="navbar__item active content-center mr-3 ml-3 hover:font-semibold hover:text-Monster-Green">
                    <Link className="navbar__link" to={`/Profile/${monsterUserObj.id}`}>Profile</Link>
                </li>
                <li className="navbar__item active content-center mr-3 ml-3 hover:font-semibold hover:text-Monster-Green">
                    <Link className="navbar__link" to="/Matches">Matches</Link>
                </li>
                <li className="navbar__item active mr-3 ml-3 hover:font-semibold hover:text-Monster-Green">
                    <Link className="navbar__link" to="/MeetUps">Monster Meets</Link>
                </li>
                {
                    localStorage.getItem("monster_user")
                        ? <li className="navbar__item navbar__logout content-center mr-3 ml-3 hover:font-semibold hover:text-Monster-Green">
                            <Link className="navbar__link" to="" onClick={() => {
                                localStorage.removeItem("monster_user")
                                navigate("/", { replace: true })
                            }}>Logout</Link>
                        </li>
                        : ""
                }
            </div>

        </ul>
    </div>

    )
}

