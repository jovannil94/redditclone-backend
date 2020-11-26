import React, { useState, useEffect } from "react";
import { useInputs } from "../util/InputHook"; 
import axios from "axios";
import "../css/CreatePost.css";

const CreatePost = () => {
    const [subreddits, setSubreddits] = useState([]);
    const [chosenSub, setChosenSub] = useState([]);
    const titleContext = useInputs("");
    const bodyContext = useInputs("");

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.post("http://localhost:3001/posts/", {
                user_id: 1,
                subreddits_id: chosenSub,
                title: titleContext,
                body: bodyContext
            })

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchSubreddits()
    }, []);

    return(
        <div className="createPostContainer">
            <select required="" onChange={handleChange}>
                <option disabled value="">Choose A Community</option>
                {subreddits.map((subreddit) => 
                    <option key={subreddit.id} value={ subreddit.id, subreddit.name }>/r{subreddit.subname}</option>
                )}
            </select>
            <form className="createForm" onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" {...titleContext}/>
                <input type="textarea" placeholder="Text(optional)" {...bodyContext}/>
                <input type="submit" value="Post"/>
            </form>
        </div>
    )
}

export default CreatePost;