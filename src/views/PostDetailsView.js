import { useContext, useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router"
import {PostContext} from '../context/PostContext'
import {AuthContext} from "../context/AuthContext"
import {Link} from 'react-router-dom'
import './PostDetails.css'

const PostDetailsView = () => {
    const {id} = useParams()
    const {user} = useContext(AuthContext)
    const {singlePost, getPostById, deletePostFromApi, editPostOnApi} = useContext(PostContext)

    useEffect(() => {
        getPostById(id)
    })

    const handleDelete = async (event) => {
        const option = window.confirm("Remove the incident?");
        if (!option) return;
        event.preventDefault();
        const response = await deletePostFromApi(id);
        navigate('/')
    }




return (
    <>
    <div className="container mt-5 infoCard">
    <h2>{singlePost.title}</h2>
    <img style={{
        width: "30vw"
    }}src={singlePost.image} alt="incident image"/>
    <br/>
    <b>What happened? </b>{singlePost.content}<br/>
    <b>How severe was the incident? </b>{singlePost.severity} RISK<br/>
    <b>Was a police report filed? </b>{singlePost.policeReport ? "yes" : "no" }<br/>
    posted on {new Date(singlePost.date).toLocaleDateString()} by {singlePost.author.name}

    </div><br/>
    <Link to="/editincident/:id" style={{color: "black"}}
                         
                         className="btn btn-outline-dark"
                     >edit incident</Link>
                     <br/>
                     </>
  


)
}

export default PostDetailsView;