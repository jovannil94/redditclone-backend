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
import { storage } from "../Fire";

const CreatePost = () => {
    const [subreddits, setSubreddits] = useState([]);
    const [chosenSub, setChosenSub] = useState("");
    const [urlLink, setUrlLink] = useState("");
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

    const handleFile = (e) => {
        e.preventDefault();
        let file = e.target.files[0];
        if(file) {
            const uploadImage = storage.ref(`images/${file.name}`).put(file)
            uploadImage.on(
                "state_changed",
                snapshot => {},
                error => {
                    console.log(error);
                },
                () => {
                    storage
                        .ref("images")
                        .child(file.name)
                        .getDownloadURL()
                        .then(url => {
                            setUrlLink(url)
                        })
                }
            )
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        debugger
        try {
            await axios.post("http://localhost:3001/posts/", {
                user_id: userID,
                sub_id: chosenSub,
                title: titleContext.value,
                context: bodyContext.value,
                image: urlLink
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
                <MenuItem disabled default>Choose a Community</MenuItem>
                {subreddits.map((subreddit) =>
                    <MenuItem key={subreddit.id} value={ subreddit.id }>/r{subreddit.subname}</MenuItem>
                )}
                </Select>
            </FormControl>
            <form className="createForm" onSubmit={handleSubmit}>
                <TextField id="filled-basic" label="Title" variant="filled" autoFocus required {...titleContext}/>
                <TextField id="filled-basic" label="Text(optional)" variant="filled" autoFocus {...bodyContext}/>
                <label>Upload Image (optional)</label>
                <input type="file" onChange={handleFile}/>
                <Button variant="contained" type="submit">Post</Button>
            </form>
        </div>
    )
}

export default CreatePost;