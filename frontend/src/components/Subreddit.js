import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import DisplayPost from "../helper/DisplayPosts";

const Subreddit = () => {
    const [getDetails, setGetDetails] = useState([]);
    const { id } = useParams();
    const user_id= parseInt(localStorage.getItem("currentUser"));
    const location = useLocation();
    let userOwner = location.state;

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
            <h1>/r/{getDetails.subname}</h1>
            { user_id ===  userOwner.owner ? 
                <button>Delete Subreddit</button> : null
                }
            <div className="subFeed">
                <DisplayPost choosen={getDetails.id}/>
            </div>
            
        </div>
    )
}

export default Subreddit