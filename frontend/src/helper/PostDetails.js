import React, { useState, useEffect } from "react";
import { useInputs } from "../util/InputHook";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/PostDetails.css";

const PostDetails = () => {
    const { id } = useParams();
    const [showPost, setShowPost] = useState([]);
    const commentContext = useInputs("");
    
    const fetchPost = async () => {
        try {
            let res = await axios.get(`http://localhost:3001/posts/post/${id}`);
            setShowPost(res.data.payload);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPost();
    }, [])

    return(
        <div className="postCard">
            <div className="postHolder">
                <h2 className="postPostedHeader">{showPost.title}</h2>
                <p className="postDetails">{showPost.body}</p>
            </div>
            <form className="postForm">
                <input className="createFormBody" required type="textarea" placeholder="What are your thoughts?" {...commentContext}/>
                <input className="createFormSubmit" type="submit" value="Post"/>
            </form>
        </div>
    )

}

export default PostDetails;