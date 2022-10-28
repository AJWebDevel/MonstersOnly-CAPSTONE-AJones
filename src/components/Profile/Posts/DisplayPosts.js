import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


export const DisplayPosts = () => {
    const localMonsterUser = localStorage.getItem("monster_user")
    const monsterUserObj = JSON.parse(localMonsterUser)
    const [posts, setPosts] = useState([])
    const { daterId } = useParams()




    //get posts
    useEffect(
        () => {
            fetch(`http://localhost:8088/posts?_expand=user&userId=${daterId}`)
                .then(res => res.json())
                .then((data) => {
                    setPosts(data)
                })
        },
        []
    )

    //delete posts takes arg >id of post to be deleted 
    //function to give id of post clicked as id arg


    const deletePost = () => {
        return fetch(`http://localhost:8088/posts?userId=${daterId}`), {
            method: "DELETE",
        }
    }


    return <> {posts.map(
        (post) => {
            const postDelete = deletePost()
            return <div>
                <div>{post?.user?.fullName} said...</div>
                <div className="postContent">{post.content}</div>
                {(post.userId === monsterUserObj.id) ?
                    (<button onClick={() => deletePost()}>Delete Post</button>)
                    : (<></>)
                }


            </div>

        }
    )}</>


}
