import React, {  useContext } from "react";
import { useInputs } from "../util/InputHook"; 
import axios from "axios";
import { UserContext } from "../provider/UserProvider";
import { useHistory } from "react-router-dom";

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
                <input className="createFormTitle" required type="text" placeholder="Subname" {...nameContext}/>
                <input className="createFormSubmit" type="submit" value="Post"/>
            </form>
        </div>
    )
}

export default CreateSubreddit;