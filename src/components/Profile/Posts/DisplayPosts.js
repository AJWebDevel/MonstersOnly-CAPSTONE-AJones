import { useEffect, useState } from "react"


export const DisplayPosts = () => {
    const localMonsterUser = localStorage.getItem("monster_user")
    const monsterUserObj = JSON.parse(localMonsterUser)
    const [posts, setPosts] = useState([])


    const deletePosts = () => {
        return fetch(`http://localhost:8088/posts?_expand=user&userId=${monsterUserObj.id}`, {
            method: "DELETE"

        })
    }

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

    return (<div>
        < h3 > Posts</h3 >
        {posts.map((post) => {
            if (post.userId === monsterUserObj.id) {
                return <>
                    <div>{post?.user?.fullName} said...</div>
                    <div className="postContent">{post.content}</div>
                    <button
                        onClick={() => { deletePosts() }
                        } >Delete Post</button>
                </>
            }

        })
        }

    </div>)
}
