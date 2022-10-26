import { useEffect, useState } from "react"

export const CreatePost = () => {
    const localMonsterUser = localStorage.getItem("monster_user")
    const monsterUserObj = JSON.parse(localMonsterUser)
    //initial state obj

    const [post, setPost] = useState({
        userId: 0,
        content: "",
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

    }

    //return new post form
    return (
        <form>
            <h2>Create A New Post</h2>
            <fieldset>
                <div>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="What do you want to say?"
                        value={post.content}
                        onChange={
                            (event) => {
                                const copy = { ...post }
                                post.content = event.target.value
                                post.userId = monsterUserObj.id
                                setPost(copy)
                            }
                        }
                    />
                </div>
            </fieldset>

            <button
                onClick={(clickEvent) => handleSubmitButtonClick(clickEvent)}
                className="submitButton">
                Submit & Post
            </button>
        </form>
    )
}
