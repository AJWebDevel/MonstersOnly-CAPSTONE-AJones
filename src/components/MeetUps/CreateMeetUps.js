import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const CreateMeetUps = () => {
    //declare initial state object
    const [meet, setMeet] = useState({
        title: "",
        date: "",
        time: "",
        location: "",
        details: "",
    })

    const navigate = useNavigate()

    const saveMeetHandler = () => {
        //fetch-post to save to API
        return fetch(`http://localhost:8088/meets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(meet)
        }).then(response => response.json())

            .then(navigate("/MeetUps"))

    }



    return <main className="bg-transparent font-crimson-text flex items-center justify-center">

        <form className="bg-Monster-Orange rounded m-20 p-20 ">
            <h2 className="font-semibold text-3xl text-center -mt-10 mb-8 m-3 underline">Create A New Monster Meet</h2>
            <fieldset className="m-3 mt-1 ">
                <div>
                    <label className="font-semibold">Title</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control m-4 rounded p-2 block"
                        placeholder="Name this meet up"
                        value={meet.title}
                        onChange={
                            (event) => {
                                const copy = { ...meet }
                                copy.title = event.target.value
                                setMeet(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset className="m-3 mt-1 ">
                <div>
                    <label className="font-semibold">Date</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control m-4 block rounded p-2"
                        placeholder="When is this Meet?"
                        value={meet.date}
                        onChange={
                            (event) => {
                                const copy = { ...meet }
                                copy.date = event.target.value
                                setMeet(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset className="m-3 mt-1 ">
                <div>
                    <label className="font-semibold">Time</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control m-4 block rounded p-2"
                        placeholder="What time is this event?"
                        value={meet.time}
                        onChange={
                            (event) => {
                                const copy = { ...meet }
                                copy.time = event.target.value
                                setMeet(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset className="m-3 mt-1 ">
                <div>
                    <label className="font-semibold">Location</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control m-4 p-2 rounded block"
                        placeholder="Where is this meet?"
                        value={meet.location}
                        onChange={
                            (event) => {
                                const copy = { ...meet }
                                copy.location = event.target.value
                                setMeet(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset className="m-3 mt-1 ">
                <div>
                    <label className="m-2 font-semibold">Details</label>
                    <textarea
                        required autoFocus
                        type="text"
                        className="form-control block
                        m-4 
                        p-2
                        resize
                        rounded"
                        placeholder="Give us the deets!"
                        value={meet.details}
                        onChange={
                            (event) => {
                                const copy = { ...meet }
                                copy.details = event.target.value
                                setMeet(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <div className=" float-route  items-center justify-center">
                <button
                    onClick={(clickEvent) => saveMeetHandler(clickEvent)}
                    className="submitButton float-right bg-white mt-2 hover:font-semibold hover:text-Monster-Green py-.5 px-2 m-3  border border-black hover:border-transparent rounded">
                    Save Monster Meet
                </button>
            </div>
        </form>
    </main>
}