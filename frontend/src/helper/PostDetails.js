import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PostDetails = () => {
    const { id } = useParams();
    const [showPost, setShowPost] = useState([]);
    
    const fetchPost = async () => {
        try {
            let res = await axios.get(`http://localhost:3001/posts/post/${id}`);
            setShowPost(res.data.payload);
        } catch (error) {
            console.log(error)
        }
    }

    // const printPost = showPost.map((post) => (
    //     <div className="postDetails" key={post.id}>
    //         <div className="postDetails">
    //             <h2>{post.title}</h2>
    //             <p>{post.body}</p>
    //         </div>
    //     </div>
    // ))

    useEffect(() => {
        fetchPost();
    }, [])

    return(
        <div className="postDetails">
            <h2>{showPost.title}</h2>
            <p>{showPost.body}</p>
        </div>
    )

}

export default PostDetails;