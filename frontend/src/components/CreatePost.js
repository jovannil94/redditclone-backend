import React, { useState, useEffect, useContext } from "react";
import { useInputs } from "../util/InputHook"; 
import axios from "axios";
import "../css/CreatePost.css";
import { UserContext } from "../provider/UserProvider";
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const CreatePost = () => {
    const [subreddits, setSubreddits] = useState([]);
    const [chosenSub, setChosenSub] = useState("");
    const titleContext = useInputs("");
    const bodyContext = useInputs("");
    const { userID } = useContext(UserContext);
    const history = useHistory();
    const homeRedirect = () => history.push(`/`);

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
        setChosenSub(e.target.value);
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
        homeRedirect();
    }

    useEffect(() => {
        fetchSubreddits()
    }, []);

    return(
        <div className="createPostContainer">
            <FormControl>
                <Select
                labelId="simple-select-label"
                id="simple-select"
                displayEmpty
                value={chosenSub}
                onChange={handleChange}
                >
                {subreddits.map((subreddit) =>
                    <MenuItem key={subreddit.id} value={ subreddit.id }>/r{subreddit.subname}</MenuItem>
                )}
                </Select>
            </FormControl>
            <form className="createForm" onSubmit={handleSubmit}>
                <TextField id="filled-basic" label="Title" variant="filled" autoFocus required {...titleContext}/>
                <TextField id="filled-basic" label="Text(optional)" variant="filled" autoFocus {...bodyContext}/>
                <Button variant="contained" type="submit">Post</Button>
            </form>
        </div>
    )
}

export default CreatePost;