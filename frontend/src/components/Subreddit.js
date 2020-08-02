import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DisplayPost from "../helper/DisplayPosts";

const Subreddit = () => {
    const [getDetails, setGetDetails] = useState([]);
    const { id } = useParams();
    
    const fetchDetails = async () => {
        try {
            let res = await axios.get(`http://localhost:3001/subreddits/${id}`);
            setGetDetails(res.data.payload.id);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchDetails()
    }, [])

    return (
        <div className="subredditContainer">
            <DisplayPost choosen={getDetails}/>
        </div>
    )
}

export default Subreddit