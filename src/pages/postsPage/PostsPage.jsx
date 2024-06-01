import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";

function PostsPage() {
    const {
        handleSubmit,
        register,
        reset
    } = useForm()

    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState({});
    const [formData, setFormData] = useState({ title: '', body: '' });

    useEffect(() => {
        getPosts()
    }, []);

    async function getPosts() {
        // const response = await fetch("http://localhost:8000/posts")
        // const data = await response.json()
        //
        // setPosts(data)
        const response = await axios.get("http://localhost:8000/posts")
        setPosts(response.data)
    }

    async function submit(values) {
        // const response = await fetch("http://localhost:8000/posts", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(values)
        // })
        // getPosts()
        const response = await axios.post("http://localhost:8000/posts", values)
        getPosts()
        reset();
    }

    async function deletePost(id) {
        // const response = await fetch(http://localhost:8000/posts/${id}, {
        //     method: "DELETE"
        // })
        // getPosts()
        const response = await axios.delete(`http://localhost:8000/posts/${id}`)
        getPosts()
    }

    async function getOnePost(id) {
        // const response = await fetch(http://localhost:8000/posts/${id}, {
        //     method: "GET"
        // })
        // getPosts()
        const response = await axios.get(`http://localhost:8000/posts/${id}`)
        setPost(response.data)
    }

    async function updatePost(id) {
        const response = await fetch(`http://localhost:8000/posts/${id}`, {
        method: "PATCH",
            body: JSON.stringify(formData)
    })
    getPosts()
    // await axios.patch(http://localhost:8000/posts/${id}, formData);
    // getPosts();

}
    return (
        <div>
            <h2>Posts list</h2>

            <form onSubmit={handleSubmit(submit)}>
                <input type="text" {...register("title")} placeholder="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                <textarea cols="30" rows="10" {...register("body")} placeholder="body" value={formData.body} onChange={(e) => setFormData({ ...formData, body: e.target.value })}></textarea>
                <button type="submit">create</button>
            </form>
            <ul>
                {
                    posts.length > 0 ?
                        posts.map(post => (
                            <li key={post.id}>
                                {post.title}
                                <button onClick={() => deletePost(post.id)}>delete</button>
                                <button onClick={() => getOnePost(post.id)}>get more info</button>
                                <button onClick={() => updatePost(post.id)}>update</button>
                            </li>
                        ))
                        :
                        <p>список пуст</p>
                }
            </ul>

            <ul>
                <li>
                    title: {post.title}
                </li>
                <li>
                    body: {post.body}
                </li>
            </ul>
        </div>
    );
}

export default PostsPage;