import { Link } from "react-router-dom"
import "./LandingPage.css"


export const LandingPage = () => {
    return <>
        <section className="landing">
            <div className="boxA">
                <div className="boxB">
                    <button><Link to="/UserList">See Users</Link></button>
                </div>
            </div>
        </section>
    </>
}