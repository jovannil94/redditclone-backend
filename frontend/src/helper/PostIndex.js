import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "../css/PostIndex.css";

const PostIndex = ({ allPost }) => {
    // const [postId, setPostId] = useState([]);
    const history = useHistory();
    const redirectToPost = (id) => history.push(`/post/${id}`);

    const openPost = (e, id) => {
        e.preventDefault();
        redirectToPost(id)
        // setPostId(id)
    }

    const printAll = allPost.map((post) => (
        <div className="postCard" key={post.id} onClick={((e) => {openPost(e, post.id)})}>
            <div className="postPostedHeader">
                <p className="postSubreddit">r/{post.subname}</p>
                <p className="postUser"> Posted by u/{post.user_name}</p>
            </div>
            <div className="postDetails">
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <p>{post.image}</p>
            </div>
        </div>
    ))

    useEffect(() => {
        // printAll(allPost)
    }, [allPost])

    return (
      <div >
      {printAll}
      </div>
    );
  };
  
  export default PostIndex;
  