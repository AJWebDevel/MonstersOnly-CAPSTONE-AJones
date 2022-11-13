import { Link } from "react-router-dom"



export const LandingPage = () => {
    const localMonsterUser = localStorage.getItem("monster_user")
    const monsterUserObj = JSON.parse(localMonsterUser)
    return <>
        <section className="flex items-center justify-center h-screen font-crimson-text">
            <div className="bg-Monster-Green font-bold rounded-lg border-Monster-Black-100  border-2 shadow-lg px-40 py-40 static top-20 bottom-20 left-10 right-10">
                <div>
                    <h2 className="text-center pt-4 -mt-40 mb-2 underline text-5xl">Monsters Only</h2>
                    <h4 className="text-center m-8 mb-15">You don't have to be lonely...</h4>
                </div>
                <div className="bg-Monster-Orange font-bold rounded-lg border-Monster-Black-100  border-2 shadow-lg px-40 py-40 static top-10 left-10 right-20">
                    {monsterUserObj.isAdmin === true ?
                        (<div className="flex flex-col">
                            <button className="bg-transparent hover:font-semibold hover:text-white m-4 py-2 px-4 border border-black hover:border-transparent rounded"><Link to="/UserList">See Users</Link></button>
                            <button className="bg-transparent hover:font-semibold hover:text-white m-4 py-2 px-4 border border-black hover:border-transparent rounded"><Link to="/MeetUps">See Monster Meets</Link></button>


                        </div>) : (<div className="flex flex-col">
                            <button className="bg-transparent hover:font-semibold hover:text-white m-4 py-2 px-4 border border-black hover:border-transparent rounded"><Link to="/MeetUps">See Monster Meets</Link></button>
                            <button className="bg-transparent hover:font-semibold hover:text-white m-4 py-2 px-4 border border-black hover:border-transparent rounded"><Link to="/Matches">See Potential Matches</Link></button>
                        </div>)}


                </div>
            </div>
        </section>
    </>
}