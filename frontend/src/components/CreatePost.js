import React, { useState, useEffect, useContext } from "react";
import { useInputs } from "../util/InputHook"; 
import axios from "axios";
import "../css/CreatePost.css";
import { UserContext } from "../provider/UserProvider";
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';
import { storage } from "../Fire";
import PostAddIcon from '@material-ui/icons/PostAdd';

const CreatePost = () => {
    const [subreddits, setSubreddits] = useState([]);
    const [chosenSub, setChosenSub] = useState("");
    const [urlLink, setUrlLink] = useState("");
    const titleContext = useInputs("");
    const bodyContext = useInputs("");
    const [filePreview, setFilePreview] = useState([]);
    const [fileName, setFileName] = useState([]);
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
        setFileName(file.name)
        setFilePreview(URL.createObjectURL(file))
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
            <div className="createPostSelectContainer">
                <PostAddIcon fontSize='large' color='secondary'/>
                <FormControl>
                    <NativeSelect
                        value={chosenSub}
                        onChange={handleChange}
                    >
                        <option hidden>Choose a Community</option>
                            {subreddits.map((subreddit) => 
                        <option key={subreddit.id} value={ subreddit.id }>/r{subreddit.subname}</option>
                            )}
                    </NativeSelect>
                </FormControl>
            </div>
            <form className="createForm" onSubmit={handleSubmit}>
                <TextField id="outlined-basic" color='secondary' label="Title" variant="outlined" autoFocus required {...titleContext}/>
                <TextField id="outlined-basic" color='secondary' label="Text(optional)" variant="outlined" autoFocus {...bodyContext}/>
                <label>Upload Image (optional)</label>
                <input className="uploadFile" type="file" onChange={handleFile}/>
                {filePreview.length > 0 ?
                    <div className="upPreviewDetails">
                        <p>{fileName}</p>
                        <img className="uploadPreview" src={filePreview} alt="preview_image"/>
                    </div>
                    : null
                }
                <Button variant="contained" color='secondary' type="submit">Post</Button>
            </form>
        </div>
    )
}

export default CreatePost;