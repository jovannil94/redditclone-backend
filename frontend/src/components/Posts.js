import React, { useState, useEffect } from "react";
// import CreatePost from "../helpers/CreatePosts";
import axios from "axios";
// import { apiURL } from "../utilities/apiURL";
// import PostIndex from "../helpers/PostIndex";
// import "../css/Post.css";

const Post = () => {
    const [posts, setPosts] = useState([]);
    // const API = apiURL();
    
    const fetchPosts = async () => {
        try {
            let res = await axios({
            })
            // setPosts(res.data.payload)    
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPosts();
    }, [])

    return(
        <div className="postContainer">
            
        </div>
    )
}

export default Post;