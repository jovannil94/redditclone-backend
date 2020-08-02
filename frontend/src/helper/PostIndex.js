import React, { useEffect } from "react";
import "../css/PostIndex.css";

const PostIndex = ({ allPost }) => {
    const printAll = allPost.map((post) => (
                <div className="postCard" key={post.id}>
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
    }, [allPost])

    return (
      <div >
            {printAll}
      </div>
    );
  };
  
  export default PostIndex;
  