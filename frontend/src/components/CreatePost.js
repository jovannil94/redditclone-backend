import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/CreatePost.css";

const CreatePost = () => {
    const [subreddits, setSubreddits] = useState([]);
    const [chosenSub, setChosenSub] = useState([]);

    const fetchSubreddits = async () => {
        try {
            let res = await axios.get(`http://localhost:3001/subreddits/`)
            setSubreddits(res.data.payload)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        e.preventDefault();
        setChosenSub(e.currentTarget.value);
    }

    useEffect(() => {
        fetchSubreddits()
    }, []);

    return(
        <div className="createPostContainer">
            <select required="" onChange={handleChange}>
                <option disabled value="">Choose A Community</option>
                {/* removed selected from option above */}
                {subreddits.map((subreddit) => 
                    <option key={subreddit.id} value={ subreddit.id, subreddit.name }>/r{subreddit.subname}</option>
                )}
            </select>
            <input type="text" placeholder="Title"/>
            <input type="textarea" placeholder="Text(optional)"/>
            <input type="submit" value="Post"/>
        </div>
    )
}

export default CreatePost;