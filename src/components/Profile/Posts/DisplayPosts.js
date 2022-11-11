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
    return <div className="bg-Monster-Orange rounded  float-right w-2/3 mr-5 h-fit clear-both box-border border-Monster-Black-100 h-64 w-64 p-4 border-4 "> {posts.map(
        (post) => {
            if (parseInt(daterId) === monsterUserObj.id) {
                return <div key={post.id} className=" border-2 border-Monster-Black-100 mb-12">
                    <div className="font-semibold p-2">
                        {post?.user?.fullName} said...
                    </div>
                    <div className="postContent bg-white rounded  m-3 mt-1 p-3">{post.content}</div>
                    <div className="float-route">
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
                        }} className="delete content-right mr-0 bg-transparent float-right hover:font-semibold hover:text-Monster-Green py-.5 px-2 m-3  border border-black hover:border-transparent rounded">Delete</button>
                    </div>


                </div>
            } else {
                return <div key={post.id} className=" border-2 border-Monster-Black-100 m-2 ">
                    <div className="font-semibold p-2">{post?.user?.fullName} said...</div>
                    <div className="postContent bg-white rounded m-2 p-2">{post.content}</div>
                </div>
            }
        })}</div>


}
