import React, {  useContext } from "react";
import { useInputs } from "../util/InputHook"; 
import axios from "axios";
import { UserContext } from "../provider/UserProvider";
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
    }

    return(
        <div className="createSubContainer">
            <form className="createForm" onSubmit={handleSubmit}>
                <label>Subreddit /r</label>
                <TextField id="filled-basic" label="Subname" variant="filled" required autoFocus required {...nameContext}/>
                {/* <input className="createFormTitle" required type="text" placeholder="Subname" {...nameContext}/> */}
                <Button variant="contained" type="submit">Post</Button>
                {/* <input className="createFormSubmit" type="submit" value="Post"/> */}
            </form>
        </div>
    )
}

export default CreateSubreddit;