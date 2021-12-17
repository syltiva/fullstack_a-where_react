import { createContext, useEffect, useState } from 'react';
import apiHelper from '../apiHelper/apiHelper'
import { toast } from 'react-toastify'
import { Navigate } from 'react-router';




export const PostContext = createContext({});

const PostProvider = ({children}) => {
    const jwt_string = "jwtawhere"
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [singlePost, setSinglePost] = useState({
        title: "",
        image: "",
        date: "",
        latitude: 0,
        longitude: 0,
        severity: "",
        policeReport: false,
        content: "", 
        author: ""

    })

    useEffect(() => {
        getAllPosts()
    }, [])

    const getAllPosts = async () => {
        setLoading(true);
        setTimeout( async () => {
            const response = await apiHelper.get("/posts");
            setPosts(response.data);
            setLoading(false)
        }, 1000)
     
    }

    const getPostById = async (id) => {
        try {
            const response = await apiHelper.get(`/posts/post/${id}`);
            setSinglePost(response.data)
        }   catch (error) {
            console.log(error)
        }
    }

    const imageUploadToApi = async (id, img) => {
        const formData = new FormData();
        formData.append('image', img);
        const response = await apiHelper.post(`/posts/post/imageUpload/${id}`, formData)
        return response;
    }

    const createPostToApi = async (obj) => {
        const {image, ...newPost} = obj
        let { user } = JSON.parse(localStorage.getItem(jwt_string));
        newPost.author = user._id;
        console.log("USERID", newPost);
        obj.date = new Date().toLocaleDateString();
        const response = await apiHelper.post("/posts/post", newPost);
        await imageUploadToApi (response.data._id, image)
        toast.success("Incident created. Thank you for your contribution.");
        getAllPosts();
    }

    const editPostOnApi = async (id, obj) => {
        const {image, ...newPost} = obj
        let {user} = JSON.parse(localStorage.getItem(jwt_string));
        if (obj.author._id !== user._id) return;
        const response = await apiHelper.put(`/posts/post/${id}`, newPost);
        await imageUploadToApi (response.data._id, image)
        toast.success("Incident updated.");
        getAllPosts();
    }

    const deletePostFromApi = async (id) => {
        await apiHelper.delete(`/posts/post/${id}`)
        toast.error("Incident deleted.")
        getAllPosts();
        await navigate('/')
    }

    return (
        <PostContext.Provider
        value={{
            posts,
            singlePost,
            loading,
            getPostById,
            createPostToApi,
            editPostOnApi,
            deletePostFromApi,
            setSinglePost, 
            imageUploadToApi
        }}
        >
            {children}
        </PostContext.Provider>
    )

}

export default PostProvider;