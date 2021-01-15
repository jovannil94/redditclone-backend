import React from "react";
import { useInputs } from "../util/InputHook";
import axios from "axios";
import "../css/LogIn.css";

const LogIn = () => {
    localStorage.clear();
    const userName = useInputs("")
    const password = useInputs("")

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            let res = await axios.post("http://localhost:3001/users/login", {
                user_name: userName.value,
                password: password.value
            })
            localStorage.setItem("currentUser", res.data.payload.id)
             window.location.href = "./"
        }catch(err){
            console.log(err)
        }
    }

    return(
        <div className="logInPage">
            <form className="logInDetails" onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" required {...userName}/>
                <input type="password" placeholder="Password" required {...password}/>
                <input type="submit" className="submit" placeholder="LOG IN"/>
            </form>
        </div>
    )
}

export default LogIn;