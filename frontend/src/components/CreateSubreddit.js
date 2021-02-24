import React, {  useContext } from "react";
import { useInputs } from "../util/InputHook"; 
import axios from "axios";
import { UserContext } from "../provider/UserProvider";
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import "../css/CreateSubreddit.css";

const CreateSubreddit = () => {
    const nameContext = useInputs("");
    const { userID } = useContext(UserContext);
    const history = useHistory();
    const homeRedirect = () => history.push(`/`);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3001/subreddits/", {
                user_id: userID,
                subname: nameContext.value
            })
        } catch (error) {
            console.log(error)
        }
        homeRedirect();
        window.location.reload()
    }

    return(
        <div className="createSubContainer">
            <form className="createSubForm" onSubmit={handleSubmit}>
                <h2>Create Subreddit /r</h2>
                <TextField id="outlined-basic" color='secondary' label="Subname" variant="outlined" required autoFocus required {...nameContext}/>
                <Button variant="contained" color='secondary' type="submit">Post</Button>
            </form>
        </div>
    )
}

export default CreateSubreddit;