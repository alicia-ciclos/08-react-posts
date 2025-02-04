import { useState, useEffect } from 'react'
import Comentarios from './Comentarios'

function Posts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState([])
    
    useEffect(() => {
        async function fetchPosts() {
            const res = await fetch('https://jsonplaceholder.typicode.com/posts')
            const postList = await res.json()
            setPosts(postList)
        }

        fetchPosts()
    }, [])

    useEffect(() => {
        async function fetchUserNames() {
            const uniqueUserIds = [...new Set(posts.map(post => post.userId))]
            const userNamePromises = uniqueUserIds.map(uid =>
                fetch(`https://jsonplaceholder.typicode.com/users/${uid}`)
                .then(res => res.json())
            )
            const authors = await Promise.all(userNamePromises);
            console.log("AUTHORS")
            console.log(authors)
            const authorNames = authors.map(user => user.name);
            console.log(authorNames)
            setUsers(authors)
            setLoading(false)
        }

        fetchUserNames()
    }, [posts])

    return (
        <>
        <div className="post-list">
            {
                posts.map(post =>
                    <div className="post" key={post.id}>
                        <h1>{post.title}</h1>
                        <p>{users[post.userId - 1]?.name}</p>
                        <p>{post.body}</p>
                        <Comentarios postId={post.id} />
                    </div>
                )
            }
        </div>
        </>
    )
}

export default Posts