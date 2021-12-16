import usePlacesAutocomplete, {
    getGeocode, 
    getLatLng,
} from "use-places-autocomplete";

import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList, 
    ComboboxOption,
} from "@reach/combobox"

import "@reach/combobox/styles.css"


import { useLoadScript } from "@react-google-maps/api"

import { Animated } from "react-animated-css"
import { useContext, useEffect, useState } from 'react'
import { useHistory, useNavigate } from 'react-router'

import { Spinner } from 'react-bootstrap' 
import { PostContext } from '../context/PostContext'

const libraries = ["places"]

const AddPostView = () => {

    const navigate = useNavigate()
    const { createPostToApi, singlePost, setSinglePost } = useContext(PostContext)

   
    
    const [loading, setLoading] = useState(false)
    const [preview, setPreview] = useState("")
    const [addressError, setAddressError] = useState("search");
    const [currentAddress, setCurrentAddress] = useState("")

    const Search = () => {
        const {
          ready,
          value,
          suggestions: { status, data },
          setValue,
          clearSuggestions,
        } = usePlacesAutocomplete({
          requestOptions: {
            location: {
              lat: () => 25.76585949266363,
              lng: () => -80.19816792343089,
            },
            radius: 10 * 1000,
          },
        });
    
        useEffect(() => {
          setValue(currentAddress, false);
        }, []);}

    useEffect(() => {
        setSinglePost ({
        title: "",
        image: "",
        date: "",
        address:"",
        latitude: 0,
        longitude: 0,
        severity: "",
        policeReport: false,
        content: "",
        author: ""
        })
    }, []);


    const handleChange = event => {
        setSinglePost ({
            ...singlePost,
            [event.target.name]: event.target.value,
        })
    }

    const handleImageChange = event => {
        const imageFile = event.target.files[0];
        setSinglePost({
            ...singlePost,
            image: imageFile
        });
        setPreview(URL.createObjectURL(imageFile))
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        setSinglePost({
            title: "",
            image: "",
            date: "",
            address: "",
            latitude: 0,
            longitude: 0,
            severity: "",
            policeReport: false,
            content: "",
            author: ""
        })

        setLoading(true);
        setTimeout(async () => {
            await createPostToApi(singlePost)
            await navigate('/')
            setLoading(false)
        }, 2000)
    }


    return (
        <>
        <div className="container">
            {loading && (
                <div style={{textAlign: 'center', marginTop: 20}}>
                <Spinner animation="grow" variant="secondary" />
                <Spinner animation="grow" variant="secondary" />
                <Spinner animation="grow" variant="secondary" />
                <br/><p style={{color: "black"}}>loading.</p>
                </div>
            )}            
        </div>
        <br/><br/><br/>

        <form className="container">
            <h4>Add an Incident</h4>
                <label>Title: </label>
                <input 
                    className="form-control" 
                    type="text" 
                    name="title" 
                    onChange={handleChange} 
                    placeholder="example: 'Man in blue shirt was breaking into cars'" 
                />
                <label>Image: </label>
                <input 
                    className="form-control" 
                    type="file" 
                    name="image" 
                    onChange={handleImageChange} 
                    placeholder="image" 
                    accept="image/*"
                />
                <label>Date:</label>
                <input 
                    className="form-control" 
                    type="text" 
                    name="date" 
                    onChange={handleChange} 
                    placeholder="date" 
                />   
                <label>Latitude: </label>
                <input 
                    className="form-control" 
                    type="number" 
                    name="latitude" 
                    onChange={handleChange} 
                    placeholder="latitude" 
                />
                <label>Longitude: </label>
                <input 
                    className="form-control" 
                    type="number" 
                    name="longitude" 
                    onChange={handleChange} 
                    placeholder="longitude" 
                />
                <label>Severity: </label>
                <select 
                    defaultValue={"title"}
                    className="form-control" 
                    name="severity" 
                    onChange={handleChange} 
                    id="" 
                >
                    <option disabled value="title">
                        select severity
                    </option>
                    <option value="LOW">Low Risk</option>
                    <option value="FAIR">Fair Risk</option>
                    <option value="HIGH">High Risk</option>
                </select>
                <label>Police Report: </label>
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

                <label>Incident: </label>
                <textarea 
                    className="form-control" 
                    type="text" 
                    name="content" 
                    onChange={handleChange} 
                    placeholder="Describe the incident" 
                />
                <button 
                    onClick={handleSubmit}
                    className="btn btn-outline-dark form-control">
                    Add Post
                </button>
                <img style={{ width:200, height: "auto", margin: "20px 0 40px 0"}} src={preview} />

                

        </form>

            </>

    
    )
}

export default AddPostView;