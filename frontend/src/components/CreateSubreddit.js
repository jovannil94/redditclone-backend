import React, { useState, useEffect, useContext } from "react";
import { useInputs } from "../util/InputHook"; 
import axios from "axios";
import { UserContext } from "../provider/UserProvider";

const CreateSubreddit = () => {
    const [subreddits, setSubreddits] = useState([]);
    const [chosenSub, setChosenSub] = useState("");
    const titleContext = useInputs("");
    const bodyContext = useInputs("");
    const { userID } = useContext(UserContext);

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
            await axios.post("http://localhost:3001/posts/", {
                user_id: userID,
                sub_id: chosenSub,
                title: titleContext.value,
                context: bodyContext.value
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
            <select className="createPostSelector" value={chosenSub} onChange={handleChange}>
            {/* create an error for not selecting a community as required does not prevent this */}
                <option disabled value="">Choose A Community</option>
                {subreddits.map((subreddit) => 
                    <option key={subreddit.id} value={subreddit.id}>/r{subreddit.subname}</option>
                )}
            </select>
            <form className="createForm" onSubmit={handleSubmit}>
                <input className="createFormTitle" required type="text" placeholder="Title" {...titleContext}/>
                <input className="createFormBody" required type="textarea" placeholder="Text(optional)" {...bodyContext}/>
                <input className="createFormSubmit" type="submit" value="Post"/>
            </form>
        </div>
    )
}

export default CreateSubreddit;