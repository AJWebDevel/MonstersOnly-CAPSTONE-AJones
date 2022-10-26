import { useEffect, useState } from "react"


export const DisplayPosts = () => {
    const localMonsterUser = localStorage.getItem("monster_user")
    const monsterUserObj = JSON.parse(localMonsterUser)

    const [posts, setPosts] = useState([])

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
            //if url daterId === post.userId > display post.map
        {posts.map((post) => {
            if (window.location.pathname === post.userId) {
                return <>
                    <div>{post?.user?.fullName} said...</div>
                    <div className="postContent">{post.content}</div>
                </>
            }

        })
</div>)
}
