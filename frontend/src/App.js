import React from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import LogIn from './components/LogIn';
import HomePage from './components/HomePage';
import NavBar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Switch>
        <Route exact path={"/login"} component={LogIn}/>
        <Route component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
