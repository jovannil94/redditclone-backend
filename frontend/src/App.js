import React, { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';
import { Route, Switch } from 'react-router-dom';
import LogIn from './components/LogIn';
import HomePage from './components/HomePage';
import NavBar from './components/Navbar';
import Subreddit from  './components/Subreddit';
import CreatePost from './components/CreatePost';
import CreateSubreddit from './components/CreateSubreddit';
import PostDetails from './helper/PostDetails';
import fire from "./Fire";
import UserProvider from './provider/UserProvider';
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
    },
    secondary: {
      main: '#1072C4',
    },
  },
});


function App() {
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [userNameError, setUserNameError] = useState("");
    const [userExist, setUserExist] = useState(false);

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
                default: case "auth/invalid-email":
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

    const handleSignUp = async () => {
        clearError();
        fire
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((res) => {
            const user = fire.auth().currentUser;
            return user.updateProfile({
              displayName: userName
            })
          })
          .catch((error) => {
            switch(error.code){
                default: case "auth/email-already-in-use":
                case "auth/invalid-email":
                    setEmailError(error.message);
                break;
                case "auth/weak-password":
                    setPasswordError(error.message);
                    break;
                case "auth/invalid-display-name":
                    setUserNameError(error.message);
                    break;
            }
        });
        try {
          await axios.post(`http://localhost:3001/users`, {
            user_name: userName,
            email: email
          });
        } catch (error) {
          console.log(error)
        }
    }

    useEffect(() => {
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
      authListener();
    }, [])

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <UserProvider>
          <NavBar/>
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
                userName={userName}
                setUserName={setUserName}
                setPassword={setPassword}
                handleLogIn={handleLogIn}
                handleSignUp={handleSignUp}
                userExist={userExist}
                setUserExist={setUserExist}
                emailError={emailError}
                passwordError={passwordError}
                userNameError={userNameError}
              />}
            />
            <Route exact path={"/subreddit/:subname"} component={Subreddit}/>
            <Route exact path={"/addpost"} component={CreatePost}/>
            <Route exact path={"/addsubreddit"} component={CreateSubreddit}/>
            <Route exact path={"/post/:id"} component={PostDetails}/>
          </Switch>
        </UserProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
