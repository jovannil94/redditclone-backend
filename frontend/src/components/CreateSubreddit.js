import React, {  useContext } from "react";
import { useInputs } from "../util/InputHook"; 
import axios from "axios";
import { UserContext } from "../provider/UserProvider";

const CreateSubreddit = () => {
    const nameContext = useInputs("");
    const { userID } = useContext(UserContext);

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
    }

    return(
        <div className="createSubContainer">
            <form className="createForm" onSubmit={handleSubmit}>
                <input className="createFormTitle" required type="text" placeholder="Subname" {...nameContext}/>
                <input className="createFormSubmit" type="submit" value="Post"/>
            </form>
        </div>
    )
}

export default CreateSubreddit;