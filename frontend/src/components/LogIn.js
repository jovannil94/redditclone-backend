import React, { useEffect } from "react";
import "../css/LogIn.css";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const LogIn = (props) => {
    const { user, email, setEmail, password, setPassword, userName, setUserName, handleLogIn, handleSignUp, userExist, setUserExist, emailError, passwordError, userNameError } = props;

    useEffect(() => {
        if(user) {
            window.location.href = "./"
        }
    }, [user])
    return (
        <div>
            <TextField id="filled-basic" label="Email" variant="filled" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)}/>
            <p>{emailError}</p>
            <TextField id="filled-basic" label="Password" variant="filled" type="password" autoFocus required value={password} onChange={(e) => setPassword(e.target.value)}/>
            <p>{passwordError}</p>
            <div>
                {!userExist ?
                <div>
                    <Button variant="contained" onClick={handleLogIn}>Log In</Button>
                    <p>
                        Don't have an account?
                        <span onClick={() => setUserExist(!userExist)}>Sign Up</span>
                    </p>
                </div>
                : 
                <div>
                    <TextField id="filled-basic" label="Username" variant="filled" autoFocus required value={userName} onChange={(e) => setUserName(e.target.value)}/>
                    <p>{userNameError}</p>
                    <Button variant="contained" onClick={handleSignUp}>Sign Up</Button>
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