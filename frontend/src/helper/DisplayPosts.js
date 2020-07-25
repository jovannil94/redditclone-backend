import React, { useState, useEffect } from "react";
import axios from "axios";
import PostIndex from "./PostIndex";

const DisplayPost = ({page}) => {
    const [allPost, setAllPost] = useState([]);

    const fetchPosts = async (page) => {
        try {
            if(page === "Home") {
                let res = await axios.get(`http://localhost:3001/posts/`);
                setAllPost(res.data.payload);
            } else {
                let res = await axios.get(`http://localhost:3001/posts/${page}`);
                setAllPost(res.data.payload);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPosts(page);
    }, [page])

    return(
        <div className="Feed">
            <PostIndex allPost={allPost}/>
        </div>
    )

}

export default DisplayPost;