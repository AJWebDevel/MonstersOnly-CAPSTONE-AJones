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
            fetch(`http://localhost:8088/posts?_expand=user`)
                .then(res => res.json())
                .then((data) => {
                    setPosts(data)
                })
        },
        []
    )

    //delete posts takes arg >id of post to be deleted 
    //function to give id of post clicked as id arg




    const deletePost = (post) => {
        if (post.userId === monsterUserObj.id) {
            return <button onClick={() => {
                fetch(`http://localhost:8088/posts?id=${post.id}`, {
                    method: "DELETE"
                })
            }} className="deleteButton" > Delete</button >
        }

    }

    return (<div>
        < h3 > Posts</h3 >
        {posts.map((post) => {
            if (post.userId === daterId) {
                return <>
                    <div>{post?.user?.fullName} said...</div>
                    <div className="postContent">{post.content}</div>
                    {deletePost(post)}

                </>
            }

        })
        }

    </div>)
}
