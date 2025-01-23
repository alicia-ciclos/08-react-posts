import { useState, useEffect } from 'react'

function Posts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        async function fetchPosts() {
            const res = await fetch('https://jsonplaceholder.typicode.com/posts')
            const postList = await res.json()
            setPosts(postList)
            setLoading(false)
        }

        fetchPosts()
    }, [])

    return (
        <>
        <div className="post-list">
            {
                posts.map(post =>
                    <div className="post" key={post.id}>
                        <h1>{post.title}</h1>
                        <p>{post.body}</p>
                    </div>
                )
            }
        </div>
        </>
    )
}

export default Posts