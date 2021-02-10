import React from "react";
import DisplayPost from "../helper/DisplayPosts";
import { useHistory } from "react-router-dom";
import "../css/HomePage.css";
import fire from "../Fire";

const HomePage = () => {
    const user = fire.auth().currentUser;
    const history = useHistory();
    const redirectToPost = () => history.push(`/addpost`);
    const redirectToSubreddit = () => history.push(`/addsubreddit`);

    return(
        <div className="homeContainer">
            <div className="homeFeed">
                {user ? <div>
                    <button onClick={redirectToPost}>Create A Post</button>
                    <button onClick={redirectToSubreddit}>Create A Subreddit</button>
                </div> 
                : null}
                <DisplayPost choosen={[]}/>
            </div>
        </div>
    )
}

export default HomePage;