import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { PostContext } from "../context/PostContext"
import './EditPost.css'

function EditPostView() {
    const { singlePost, getPostById, setSinglePost, editPostOnApi, deletePostFromApi } = useContext(PostContext)
    const navigate = useNavigate();
    const { user } = JSON.parse(localStorage.getItem("jwtawhere"))
    const {id} = useParams()
    const [preview, setPreview] = useState("")


    useEffect(() => {
        setSinglePost({
            ...singlePost, 
        })

    }, []);

    useEffect(() => {
        getPostById(id);
    }, []);


    const handleChange = (event) => {
        setSinglePost({
            ...singlePost,
            [event.target.name]: event.target.value
        })
    };

    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        console.log("imageFile", imageFile)
        setSinglePost({
            ...singlePost,
            image: imageFile
        });
        setPreview(URL.createObjectURL(imageFile))
    };

    const handleSubmit = async (event) => {
        event.preventDefault()  
        await editPostOnApi(id, singlePost);
        await navigate("/")
    };

    const handleDelete = async (event) => {
        event.preventDefault();
        let choice = window.confirm("Are you sure you what to remove the incident?")
        if (!choice) return;
        console.log("id to be deleted", id)
        await deletePostFromApi(id)
        console.log("post deleted")
        navigate('/');
    };

    return (
        <div className="container mt-5">
            <form className="form">
            <h2>Incident Title: {singlePost.title}</h2>
            <label>Title:</label>
            <input
                name="title"
                value={singlePost.title}
                onChange={handleChange}
                className="form-control"
                type="text"
                placeholder="title"
            />
            <label>Image:</label>
            <input
                name="image"
                // value={preview}
                onChange={handleImageChange}
                className="form-control"
                accept="image/*"
                placeholder="image"
                type="file"
            />
            <label>Date: {singlePost.date}</label>
            <input
                name="date"
                value={singlePost.date}
                onChange={handleChange}
                className="form-control"
                type="date"
                placeholder="date"
            /><br/>
            <p><i>Latitude:</i> {singlePost.latitude} <i>Longitude:</i> {singlePost.longitude}</p>
            
            <label>Severity:</label>
            <select
                name="severity"
                value={singlePost.severity}
                onChange={handleChange}
                className="form-control"
                id=""
            >
             <option disabled value="title">
                        select severity
                    </option>
                    <option value="LOW">Low Risk</option>
                    <option value="FAIR">Fair Risk</option>
                    <option value="HIGH">High Risk</option>
                </select>
            <label>Police Report:</label>
            <select 
                    defaultValue={"title"}
                    className="form-control" 
                    name="policeReport" 
                    onChange={handleChange} 
                    id=""
                >
                <option disabled value="title">was a police report filed?</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
                </select>
            <label>Incident:</label>
            <textarea 
                    className="form-control" 
                    type="text" 
                    name="content" 
                    onChange={handleChange} 
                    placeholder="Summarize the incident" 
                    value={singlePost.content}

                />
                <button 
                    onClick={handleSubmit}
                    className="btn btn-outline-dark form-control">
                    submit changes
                </button>
                <button
                    onClick={handleDelete}
                    className='btn btn-outline-dark form-control'
                    >
                    remove incident

                </button>
                <img style={{ width:200, height: "auto", margin: "20px 0 40px 0"}} src={preview} />
            </form>
            
        </div>
    )
}

export default EditPostView;