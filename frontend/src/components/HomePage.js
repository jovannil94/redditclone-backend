import React from "react";
import DisplayPost from "../helper/DisplayPosts";
import { useHistory } from "react-router-dom";
import "../css/HomePage.css";

const HomePage = () => {
    const history = useHistory();
    const redirectToPost = () => history.push(`/submit`);

    return(
        <div className="homeContainer">
            <div className="homeFeed">
                <input type="text" placeholder="Create A Post" onClick={redirectToPost}/>
                <DisplayPost choosen={[]}/>
            </div>
        </div>
    )
}

export default HomePage;