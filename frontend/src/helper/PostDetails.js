import React, { useState, useEffect } from "react";
import { useInputs } from "../util/InputHook";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/PostDetails.css";

const PostDetails = () => {
    const { id } = useParams();
    const [showPost, setShowPost] = useState([]);
    const [showAllComments, setShowAllComments] = useState([]);
    const commentContext = useInputs("");
    
    const fetchPost = async () => {
        try {
            let post = await axios.get(`http://localhost:3001/posts/post/${id}`);
            let comments = await axios.get(`http://localhost:3001/comments/${id}`);
            setShowPost(post.data.payload);
            setShowAllComments(comments.data.payload);
        } catch (error) {
            console.log(error)
        }
    }

    const printComments = showAllComments.map((comment) => (
        <div className="commentCard" key={comment.id}>
            <div className="commentHeader">
                <p className="commentUser"> {comment.user_name}</p>
                <p className="commentDate"> {comment.comment_date}</p>
            </div>
            <div className="commentDetails">
                <p>{comment.body}</p>
            </div>
        </div>
    ))

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.post("http://localhost:3001/comments/", {
                user_id: 2,
                post_id: id,
                context: commentContext.value
            })
            fetchPost();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPost();
    }, [id])

    return(
        <div className="postCard">
            <div className="postHolder">
                <h2 className="postPostedHeader">{showPost.title}</h2>
                <p className="postDetails">{showPost.body}</p>
            </div>
            <form className="postForm" onSubmit={handleSubmit}>
                <input className="createFormBody" required type="textarea" placeholder="What are your thoughts?" {...commentContext}/>
                <input className="createFormSubmit" type="submit" value="Post"/>
            </form>
            <div className="postComments">
                {printComments}
            </div>
        </div>
    )

}

export default PostDetails;