import React, { useState, useEffect, useContext } from "react";
import { useInputs } from "../util/InputHook";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/PostDetails.css";
import { UserContext } from "../provider/UserProvider";
import { useHistory } from "react-router-dom";
import fire from "./../Fire";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import RedditIcon from '@material-ui/icons/Reddit';
import IconButton from '@material-ui/core/IconButton';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import moment from "moment";

const PostDetails = () => {
    const { id } = useParams();
    const [showPost, setShowPost] = useState([]);
    const [showPostVotes, setShowPostVotes] = useState([]);
    const [showAllComments, setShowAllComments] = useState([]);
    const { userID } = useContext(UserContext);
    const commentContext = useInputs("");
    const user = fire.auth().currentUser;
    const history = useHistory();
    const logInRedirect = () => history.push(`/login`);
    
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
                <RedditIcon fontSize='large' color='secondary'/>
                <p className="commentInfo">{comment.user_name}</p>
                <p className="commentDate">{moment(comment.comment_date).fromNow()}</p>
            </div>
            <div className="commentDetails">
                <p>{comment.body}</p>
            </div>
        </div>
    ))

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user !== null){
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
        } else {
            logInRedirect(); 
        }
    }

    const handlePostVote = async (type) => {
        if (user !== null) {
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
        } else {
            logInRedirect(); 
        }
    }

    useEffect(() => {
        fetchPost();
    }, [id])

    return(
        <div className="singlePostCard">
            <div className="postVotes">
                <IconButton aria-label="up" onClick={() => handlePostVote("up")}>
                    <ArrowUpwardIcon className="icon" style={{ color: '#F74202' }}/>
                </IconButton>
                <p className="postCount">{showPostVotes}</p>
                <IconButton aria-label="down" onClick={() => handlePostVote("down")}>
                    <ArrowDownwardIcon className="icon" style={{ color: '#8D8FF7' }}/>
                </IconButton>
            </div>
            <div className="postContent">
                <div className="postHolder">
                    <h2 className="postPostedHeader">{showPost.title}</h2>
                    <p className="postDetails">{showPost.body}</p>
                    {showPost.image ? 
                    <img className="postImage" src={showPost.image} alt="post_image"/>
                    : null
                }
                </div>
                <form className="postForm" onSubmit={handleSubmit}>
                    <TextField id="outlined-basic" color='secondary' variant="outlined" label="What are your thoughts?" autoFocus required {...commentContext}/>
                    <br/>
                    <Button variant="contained" color='secondary' type="submit">Post</Button>
                </form>
                <div className="postComments">
                    {printComments}
                </div>
            </div>
        </div>
    )

}

export default PostDetails;