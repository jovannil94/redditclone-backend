import React from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import LogIn from './components/LogIn';
import HomePage from './components/HomePage';
import NavBar from './components/Navbar';
import Subreddit from  './components/Subreddit';
import CreatePost from './components/CreatePost';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Switch>
        <Route exact path={"/"} component={HomePage}/>
        <Route exact path={"/login"} component={LogIn}/>
        <Route exact path={"/subreddit/:id"} component={Subreddit}/>
        <Route exact path={"/submit"} component={CreatePost}/>
      </Switch>
    </div>
  );
}

export default App;
