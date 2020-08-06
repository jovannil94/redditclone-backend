import React from "react";
import DisplayPost from "../helper/DisplayPosts";
import { useHistory } from "react-router-dom";
import "../css/HomePage.css";

const HomePage = () => {
    const history = useHistory();
    const redirectToPost = () => history.push(`/submit`);

    return(
        <div className="homePageContainer">
            <div className="empty"></div>
            <div className="feed">
                <input type="text" placeholder="Create A Post" onClick={redirectToPost}/>
                <DisplayPost choosen={[]}/>
            </div>
            <div className="communitiesAds"></div>
            <div className="empty2"></div>
        </div>
    )
}

export default HomePage;