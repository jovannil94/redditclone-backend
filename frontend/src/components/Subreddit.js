import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DisplayPost from "../helper/DisplayPosts";

const Subreddit = () => {
    const { id } = useParams();
    debugger
    return (
        <div className="subredditContainer">
            <DisplayPost Subreddit={Subreddit}/>
        </div>
    )
}

export default Subreddit