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




    //return all posts from selected user
    return <> {posts.map(
        (post) => {
            if (parseInt(daterId) === monsterUserObj.id) {
                return <div key={post.id}>
                    <div>{post?.user?.fullName} said...</div>
                    <div className="postContent">{post.content}</div>

                    <button onClick={() => {
                        fetch(`http://localhost:8088/posts/${post.id}`, {
                            method: "DELETE"
                        })
                            .then(() => {
                                fetch(`http://localhost:8088/posts?_expand=user&userId=${daterId}`)
                                    .then(res => res.json())
                                    .then((newData) => {
                                        setPosts(newData)
                                    })
                            })
                    }} className="delete">Delete</button>



                </div>
            } else {
                return <div key={post.id}>
                    <div>{post?.user?.fullName} said...</div>
                    <div className="postContent">{post.content}</div>
                </div>
            }
        })}</>


}
