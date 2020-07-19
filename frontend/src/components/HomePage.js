import React from "react";
import DisplayPost from "../helper/DisplayPosts";
// import Subreddit from "./subreddit";
// import Post from "./Posts";
// import "../css/Home.css";

const HomePage = () => {
    return(
        <div className="homePageContainer">
            <div className="empty"></div>
            <div className="feed">
                <DisplayPost/>
            </div>
            <div className="communitiesAds"></div>
            <div className="empty2"></div>
        </div>
    )
}

export default HomePage;