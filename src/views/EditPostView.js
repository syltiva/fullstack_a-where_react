import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { PostContext } from "../context/PostContext"

function EditPostView() {
    const { singlePost, getPostById, setSinglePost, editPostOnApi, deletePostFromApi } = useContext(PostContext)
    const navigate = useNavigate();
    const { user } = JSON.parse(localStorage.getItem("jwtawhere"))
    const {id} = useParams()
    const [preview, setPreview] = useState("")


    useEffect(() => {
        setSinglePost({
            ...singlePost
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
        setSinglePost({
            ...singlePost,
            image: imageFile
        });
        setPreview(URL.createObjectURL(imageFile))
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        await editPostOnApi(id, singlePost);
    };

    const handleDelete = async (event) => {
        event.preventDefault();
        let choice = window.confirm("Delete Incident?")
        if (!choice) return;
        await deletePostFromApi(id)
        navigate('/');
    };

    return (
        <div className="container mt-5">
            <form className="form">
            <h2>Edit Incident: {singlePost.title}</h2>
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
                value={singlePost.image}
                onChange={handleImageChange}
                className="form-control"
                accept="image/*"
                placeholder="image"
            />
            <label>Date:</label>
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
                    Edit Incident
                </button>
                <button
                    onClick={handleDelete}
                    className='btn btn-outline-dark form-control'
                    >
                    Delete Incident

                </button>
                <img style={{ width:200, height: "auto", margin: "20px 0 40px 0"}} src={preview} />
            </form>
            
        </div>
    )
}

export default EditPostView;