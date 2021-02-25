import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DisplayPost from "../helper/DisplayPosts";
import "../css/Subreddit.css"

const Subreddit = () => {
    const [getDetails, setGetDetails] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchDetails = async () => {
        try {
            let res = await axios.get(`http://localhost:3001/subreddits/${id}`);
            setGetDetails(res.data.payload);
        } catch (error) {
            console.log(error)
        }
    }
        fetchDetails();
    }, [id])

    return (
        <div className="subContainer">
            <h1 className="subTitle">/r/{getDetails.subname}</h1>
            <div className="subFeed">
                <DisplayPost choosen={getDetails.id}/>
            </div>
            
        </div>
    )
}

export default Subreddit