import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DisplayPost from "../helper/DisplayPosts";

const Subreddit = () => {
    const { id } = useParams();
    return (
        <div className="subredditContainer">
            <DisplayPost page={id}/>
        </div>
    )
}

export default Subreddit