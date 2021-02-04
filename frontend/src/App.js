import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import LogIn from './components/LogIn';
import HomePage from './components/HomePage';
import NavBar from './components/Navbar';
import Subreddit from  './components/Subreddit';
import CreatePost from './components/CreatePost';
import PostDetails from './helper/PostDetails';
import fire from "./Fire";

function App() {
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [userExist, setUserExist] = useState(false);
    // console.log(user)

    const clearInputs = () => {
        setEmail("");
        setPassword("");
    }

    const clearError = () => {
        setEmailError("");
        setPasswordError("");
    }

    const handleLogIn = () => {
        clearError();
        fire
          .auth()
          .signInWithEmailAndPassword(email, password)
          .catch((error) => {
            switch(error.code){
                case "auth/invalid-email":
                case "auth/user-disabled":
                case "auth/user-not-found":
                    setEmailError(error.message);
                break;
                case "auth/wrong-password":
                    setPasswordError(error.message);
                    break;
            }
        });
    }

    const handleSignUp = () => {
        clearError();
        fire
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .catch((error) => {
            switch(error.code){
                case "auth/email-already-in-use":
                case "auth/invalid-email":
                    setEmailError(error.message);
                break;
                case "auth/weak-password":
                    setPasswordError(error.message);
                    break;
            }
        });
    }

    const handleLogOut = () => {
        fire.auth().signOut();
    }

    const authListener = () => {
        fire.auth().onAuthStateChanged(user => {
            if(user){
                clearInputs();
                setUser(user);
            } else {
                setUser("");
            }
        })
    }

    useEffect(() => {
        authListener();
    }, [])

  return (
    <div className="App">
      <NavBar user={user} handleLogOut={handleLogOut}/>
      <Switch>
        <Route exact path={"/"}
          render={() =>
            <HomePage 
            user={user}
            />}
        />
        <Route exact path={"/login"}
          render={() => 
          <LogIn
            user={user}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogIn={handleLogIn}
            handleSignUp={handleSignUp}
            userExist={userExist}
            setUserExist={setUserExist}
            emailError={emailError}
            passwordError={passwordError}
          />}
        />
        <Route exact path={"/subreddit/:id"} component={Subreddit}/>
        <Route exact path={"/submit"} component={CreatePost}/>
        <Route exact path={"/post/:id"} component={PostDetails}/>
      </Switch>
    </div>
  );
}

export default App;
