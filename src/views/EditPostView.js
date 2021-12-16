import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function EditPostView() {
    const navigate = useNavigate();
    const [preview, setPreview] = useState("")
    const [post, setPost] = useState({
        image: "",
        date: "",
        longitude: 0,
        latitude: 0, 
        severity: "",
        policeReport: false,
        content: ""
    });

    useEffect(() => {

    }, []);

    const handleChange = (event) => {
        setPost({
            ...post,
            [event.target.name]: event.target.value
        })
    };

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    return (
        <div>

        </div>
    )
}

export default EditPostView;