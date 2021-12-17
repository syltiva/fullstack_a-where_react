import { useContext, useEffect, useState} from "react"
import {useParams} from "react-router"
import {PostContext} from '../context/PostContext'
import {AuthContext} from "../context/AuthContext"

const PostDetailsView = () => {
    const {id} = useParams()
    const {user} = useContext(AuthContext)
    const {singlePost, getPostById} = useContext(PostContext)

    useEffect(() => {
        getPostById(id)
    })



return (
    <div className="container mt-5">
    <h1>Incident Details</h1>
    <h2>{singlePost.title}</h2>
    <div className="row">
    <div className="column-lg-12 column-sm-12 my-4 codeBox">
    {singlePost.image}
    <div style={{minHeight:80}} className="col-4 mt-2">
    <b>What happened? </b>{singlePost.content}<br/>
    <b>Rate the severity: </b>{singlePost.severity}<br/>
    <b>Was a police report filed? </b>{singlePost.policeReport ? "yes" : "no" }<br/>
    posted on {singlePost.date} by {singlePost.author.name}

    </div>
    </div>

    </div>

    </div>
)
}

export default PostDetailsView;