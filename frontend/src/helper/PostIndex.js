import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import RedditIcon from '@material-ui/icons/Reddit';
import "../css/PostIndex.css";

const PostIndex = ({ allPost }) => {
    const history = useHistory();
    const redirectToPost = (id) => history.push(`/post/${id}`);
    const openPost = (e, id) => {
        e.preventDefault();
        redirectToPost(id)
    }

    const printAll = allPost.map((post) => (
        <div className="postCard" key={post.id} onClick={((e) => {openPost(e, post.id)})}>
            <div className="postPostedHeader">
                <RedditIcon fontSize='large' color='secondary'/>
                <p className="postSubreddit"><b>r/{post.subname}</b></p>
                <p className="postUser"> Posted by u/{post.user_name}</p>
            </div>
            <div className="postDetails">
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                {post.image ? 
                    <img className="postImage" src={post.image} alt="post_image"/>
                    : null
                }
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
  