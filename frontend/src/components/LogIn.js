import React, { useEffect } from "react";
import "../css/LogIn.css";

const LogIn = (props) => {
    const { user, email, setEmail, password, setPassword, handleLogIn, handleSignUp, userExist, setUserExist, emailError, passwordError } = props;

    useEffect(() => {
        if(user) {
            window.location.href = "./"
        }
    }, [user])
    return (
        <div>
            <label>Username</label>
            <input type="text" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)}/>
            <p>{emailError}</p>
            <label>Password</label>
            <input type="password" autoFocus required value={password} onChange={(e) => setPassword(e.target.value)}/>
            <p>{passwordError}</p>
            <div>
                {!userExist ?
                <div>
                    <button onClick={handleLogIn}>Login</button>
                    <p>
                        Don't have an account?
                        <span onClick={() => setUserExist(!userExist)}>Sign Up</span>
                    </p>
                </div>
                : 
                <div>
                    <button onClick={handleSignUp}>Sign Up</button>
                    <p>
                        Have an account?
                        <span onClick={() => setUserExist(!userExist)}>Login</span>
                    </p>
                </div>}
            </div>
        </div>

    )
}

export default LogIn;