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
        <div className="loginContainer">
            <div className="loginContent">
                { !userExist ?
                    <h2 className="logInTitle">Log In</h2>
                    : <h2 className="logInTitle">Create an Account</h2>
                }
                <TextField id="outlined-basic" color='secondary' variant="outlined" label="Email" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)}/>
                <p>{emailError}</p>
                <TextField id="outlined-basic" color='secondary' variant="outlined" label="Password" type="password" autoFocus required value={password} onChange={(e) => setPassword(e.target.value)}/>
                <p>{passwordError}</p>
                <>
                    {!userExist ?
                    <>
                        <Button variant="contained" color='secondary' onClick={handleLogIn}>Log In</Button>
                        <p>
                            Don't have an account?
                            <br/>
                            <span className="logInClick" onClick={() => setUserExist(!userExist)}>Sign Up</span>
                        </p>
                    </>
                    : 
                    <>
                        <TextField id="outlined-basic" color='secondary' variant="outlined" label="Username" autoFocus required value={userName} onChange={(e) => setUserName(e.target.value)}/>
                        <p>{userNameError}</p>
                        <Button variant="contained" color='secondary' onClick={handleSignUp}>Sign Up</Button>
                        <p>
                            Have an account?
                            <br/>
                            <span className="logInClick" onClick={() => setUserExist(!userExist)}>Login</span>
                        </p>
                    </>}
                </>
            </div>
        </div>
    )
}

export default LogIn;