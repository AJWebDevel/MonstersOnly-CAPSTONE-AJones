import { useEffect, useState } from "react"

export const CreatePost = () => {
    const localMonsterUser = localStorage.getItem("monster_user")
    const monsterUserObj = JSON.parse(localMonsterUser)
    //initial state obj

    const [post, setPost] = useState({
        userId: 0,
        content: ""
    })




    /*save button click event function here
        //put employee send obj and fetch-POST here */
    const handleSubmitButtonClick = async (event) => {
        event.preventDefault()


        // TODO: Perform the fetch() to POST the object to the API

        fetch(`http://localhost:8088/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        }).then(response => response.json())

        window.location.reload()
    }

    //return new post form
    return (
        <form className="border-2 font-crimson-text border-Monster-Black-100 w-2/3 mr-5   bg-Monster-Orange shadow-md rounded  mt-20 float-right">
            <h2 className="font-bold mb-2 text-2xl m-3">Create A New Post</h2>
            <fieldset className="m-3 mt-1 ">
                <div>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control w-full"
                        placeholder="What do you want to say?"
                        value={post.content}
                        onChange={
                            (event) => {
                                const copy = { ...post }
                                copy.content = event.target.value
                                copy.userId = monsterUserObj.id
                                setPost(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <div className=" float-route  items-center justify-center">
                <button
                    onClick={(clickEvent) => handleSubmitButtonClick(clickEvent)}
                    className="submitButton float-right bg-transparent mt-2 hover:font-semibold hover:text-Monster-Green py-.5 px-2 m-3  border border-black hover:border-transparent rounded">
                    Submit & Post
                </button>
            </div>

        </form>
    )
}
