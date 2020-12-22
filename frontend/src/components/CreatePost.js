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
                title: titleContext.value,
                body: bodyContext.value
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
            <select className="createPostSelector" required="" onChange={handleChange}>
                <option disabled value="">Choose A Community</option>
                {subreddits.map((subreddit) => 
                    <option key={subreddit.id} value={subreddit.id}>/r{subreddit.subname}</option>
                )}
            </select>
            <form className="createForm" onSubmit={handleSubmit}>
                <input className="createFormTitle" type="text" placeholder="Title" {...titleContext}/>
                <input className="createFormBody" type="textarea" placeholder="Text(optional)" {...bodyContext}/>
                <input className="createFormSubmit" type="submit" value="Post"/>
            </form>
        </div>
    )
}

export default CreatePost;