import React, { useState, useEffect, useContext } from "react";
import { useInputs } from "../util/InputHook";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/PostDetails.css";
import { UserContext } from "../provider/UserProvider";

const PostDetails = () => {
    const { id } = useParams();
    const [showPost, setShowPost] = useState([]);
    const [showPostVotes, setShowPostVotes] = useState([]);
    const [showAllComments, setShowAllComments] = useState([]);
    const { userID } = useContext(UserContext);
    const commentContext = useInputs("");
    
    const fetchPost = async () => {
        try {
            let post = await axios.get(`http://localhost:3001/posts/post/${id}`);
            let postVotes = await axios.post(`http://localhost:3001/votes/count`, {
                post_id: `${id}`
            });
            let comments = await axios.get(`http://localhost:3001/comments/${id}`);
            setShowPost(post.data.payload);
            setShowPostVotes(postVotes.data.payload);
            setShowAllComments(comments.data.payload);
        } catch (error) {
            console.log(error)
        }
    }

    const printComments = showAllComments.map((comment) => (
        <div className="commentCard" key={comment.id}>
            <div className="commentHeader">
                <p className="commentUser">{comment.user_name}</p>
                <p className="commentDate">{comment.comment_date}</p>
            </div>
            <div className="commentDetails">
                <p>{comment.body}</p>
            </div>
        </div>
    ))

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3001/comments/", {
                user_id: userID,
                post_id: id,
                context: commentContext.value
            })
            fetchPost();
        } catch (error) {
            console.log(error)
        }
    }

    const handlePostVote = async (e) => {
        e.preventDefault();
        let type = e.target.value
        try {
            let didVote = await axios.post("http://localhost:3001/votes/check",{
                user_id: userID,
                post_id: id
            })
            if (didVote.data.payload.length === 0){
                    await axios.post("http://localhost:3001/votes/add",{
                    user_id: userID,
                    post_id: id,
                    vote_type: type
                });
            } else if (didVote.data.payload[0].vote_type === type) {
                await axios.delete("http://localhost:3001/votes/delete", {
                    data: {
                        user_id: userID,
                        post_id: id 
                    }
                });
            } else if (didVote.data.payload[0].vote_type !== type) {
                await axios.patch("http://localhost:3001/votes/changevote", {
                    user_id: userID,
                    post_id: id,
                    vote_type: type
                });
            }
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
        <div className="postVotes">
            <button className="postUpVote" value="up" onClick={handlePostVote}/>
            <p className="postCount">{showPostVotes}</p>
            <button className="postDownVote" value="down" onClick={handlePostVote}/>
        </div>
            <div className="postContent">
                <div className="postHolder">
                    <h2 className="postPostedHeader">{showPost.title}</h2>
                    <p className="postDetails">{showPost.body}</p>
                </div>
                <form className="postForm" onSubmit={handleSubmit}>
                    <textarea className="createFormBody" required placeholder="What are your thoughts?" {...commentContext}/>
                    <input className="createFormSubmit" type="submit" value="Post"/>
                </form>
                <div className="postComments">
                    {printComments}
                </div>
            </div>
        </div>
    )

}

export default PostDetails;