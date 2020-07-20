import React from "react";
import DisplayPost from "../helper/DisplayPosts";
import "../css/HomePage.css";

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