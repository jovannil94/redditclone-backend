import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../css/Navbar.css";
import logo from "../images/redditLogo.png";
import axios from "axios";
import fire from "./../Fire";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import FormHelperText from '@material-ui/core/FormHelperText';
import NativeSelect from '@material-ui/core/NativeSelect';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

const NavBar = () => {
    const user = fire.auth().currentUser;
    const [subreddits, setSubreddits] = useState([]);
    const [chosen, setChosen] = useState([]);
    const history = useHistory();
    const homeRedirect = () => history.push(`/`);
    const logInRedirect = () => history.push(`/login`);
    const classes = useStyles();

    const subredditRedirect = (selected) => {
        history.push({
            pathname: `/subreddit/${selected}`
        });
    }
    
    const fetchSubreddits = async () => {
        try {
            let res = await axios.get(`http://localhost:3001/subreddits/`)
            setSubreddits(res.data.payload)
        } catch (error) {
            console.log(error)
        }
    }

    const handleLogoClick = () => {
        homeRedirect()
    }

    const handleChange = async (e) => {
        e.preventDefault();
        if(e.target.value === "Home") {
            homeRedirect();
        } else {
            let sub = e.target.value
            subredditRedirect(sub)
        }
    }

    const signOut = () => {
        fire.auth().signOut();
        window.location.href = "./"
    }

    const logIn = () => {
        logInRedirect();
    }

    useEffect(() => {
        fetchSubreddits()
    }, []);

    return(
        <AppBar position="static">
            <Toolbar>
                <img src={logo} className="Logo" alt="" onClick={handleLogoClick}/>
                <FormControl className={classes.formControl}>
                    <NativeSelect
                    value={chosen}
                    onChange={handleChange}
                    inputProps={{
                        name: 'subreddit',
                        id: 'subname',
                    }}
                    >
                        <option value={"Home"}>Home</option>
                        {subreddits.map((subreddit) => 
                            <option key={subreddit.id} value={ subreddit.subname }>/r{subreddit.subname}</option>
                        )}
                    </NativeSelect>
                </FormControl>
                {/* <FormControl>
                    <Select
                    labelId="simple-select-label"
                    id="simple-select"
                    displayEmpty
                    value={chosen}
                    onChange={handleChange}
                    >
                    <MenuItem value="Home">Home</MenuItem>
                    {subreddits.map((subreddit) => 
                        <MenuItem key={subreddit.id} value={ subreddit.subname }>/r{subreddit.subname}</MenuItem>
                    )}
                    </Select>
                </FormControl> */}
                {user ? 
                    <Typography variant="h6" className={classes.title}>
                    u/{user.displayName}
                    </Typography>
                : null}
                { user ?
                    <Button variant="inherit" onClick={signOut}>Sign Out</Button> :
                    <Button variant="inherit" onClick={logIn}>Log In</Button>
                    }
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;