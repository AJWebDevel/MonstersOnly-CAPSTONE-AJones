import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


export const MeetUps = () => {
    const [meets, setMeets] = useState([])

    const localMonsterUser = localStorage.getItem("monster_user")
    const monsterUserObj = JSON.parse(localMonsterUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/meets`)
                .then(res => res.json())
                .then((data) => {
                    setMeets(data)
                })
        },
        []
    )


    return <main className=" flex  bg-Monster-Green m-20 p-10 ">
        <div className="text-center ">
            <h3 className=" font-semibold underline">Monster Meets</h3>
            <div className=" text-center">
                {
                    meets.map(
                        (meet) => {
                            return <div key={meet.id} className=" m-5 border-2 w-100 bg-Monster-Orange rounded border-Monster-Black-100 p-10 pb-2 shadow-lg">
                                <h3 className="font-semibold underline ">{meet.title}</h3>
                                <p className="pt-6">{meet.date}</p>
                                <p>{meet.time}</p>
                                <p>{meet.location}</p>
                                <p className="p-6">{meet.details}</p>
                                {
                                    monsterUserObj.isAdmin == true ?
                                        <button onClick={() => {
                                            fetch(`http://localhost:8088/meets/${meet.id}`, {
                                                method: "DELETE"
                                            })
                                                .then(() => {
                                                    fetch(`http://localhost:8088/meets`)
                                                        .then(res => res.json())
                                                        .then((newData) => {
                                                            setMeets(newData)
                                                        })
                                                })
                                        }}
                                            className="bg-transparent  hover:font-semibold hover:underline py-.5 px-2 m-3  border border-black hover:border-transparent rounded"
                                        >Delete Meet</button>
                                        : <></>
                                }
                            </div>
                        }
                    )


                }




            </div>
            <div>
                {monsterUserObj.isAdmin == true ?
                    <button
                        className="bg-transparent  hover:font-semibold hover:underline py-.5 px-2 m-3  border border-black hover:border-transparent rounded">
                        <Link to={`CreateMeetUps`}>Create New Meet</Link></button>
                    : <></>}
            </div>

        </div>
    </main>
}