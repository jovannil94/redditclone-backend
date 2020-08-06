import React, { useEffect } from "react";
import axios from "axios";
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
    // const printAll = (allPost) => {
    //     allPost.map(async (post) => {
    //             // let votes = await axios.get(`http://localhost:3001/votes/${post.id}`);
    //             // debugger
    //             //  return(
    //                 <div className="postCard" key={post.id}>
    //                     <p>{votes.data.payload.countVotes[0].count}</p>
    //                     <div className="postPostedHeader">
    //                         <p className="postSubreddit">r/{post.subname}</p>
    //                         <p className="postUser"> Posted by u/{post.user_name}</p>
    //                     </div>
    //                     <div className="postDetails">
    //                         <h2>{post.title}</h2>
    //                         <p>{post.body}</p>
    //                         <p>{post.image}</p>
    //                     </div>
    //                 </div> 
    //                 // )   
    //         }
    //     )
    // }

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
  