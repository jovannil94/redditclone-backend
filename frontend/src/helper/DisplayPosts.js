import React, { useState, useEffect } from "react";
import axios from "axios";
import PostIndex from "./PostIndex";

const DisplayPost = () => {
    const [allPost, setAllPost] = useState([]);

    const fetchPosts = async () => {
        try {
            let res = await axios.get(`http://localhost:3001/posts/`);
            setAllPost(res.data.payload);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPosts();
    }, [])

    return(
        <div className="Feed">
            <PostIndex allPost={allPost}/>
        </div>
    )

}

export default DisplayPost;