import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../css/Navbar.css";
import logo from "../images/redditLogo.png";
import axios from "axios";
import fire from "./../Fire";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import NativeSelect from '@material-ui/core/NativeSelect';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import PageviewIcon from '@material-ui/icons/Pageview';

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
    const [chosen, setChosen] = useState("");
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
        let sub = e.target.value
        setChosen(sub)
        if(sub === "Home") {
            homeRedirect();
        } else {
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
        <AppBar style={{height: 55}} position="static">
            <Toolbar>
            <Grid
            justify="space-between"
            container 
            spacing={24}
            >
                <Grid item>
                    <img src={logo} className="Logo" alt="" onClick={handleLogoClick}/>
                </Grid>
                <Grid item>
                    <PageviewIcon fontSize='large' color='secondary'/>
                    <FormControl className={classes.formControl}>
                        <NativeSelect
                        value={chosen}
                        onChange={handleChange}
                        inputProps={{
                            name: 'subreddit',
                            id: 'subname',
                        }}
                        >
                            <option value="Home">Home</option>
                            {subreddits.map((subreddit) => 
                                <option key={subreddit.id} value={ subreddit.subname }>/r{subreddit.subname}</option>
                            )}
                        </NativeSelect>
                    </FormControl>
                </Grid>
                <Grid item>
                    {user ? 
                        <Typography variant="h6" className={classes.title}>
                        u/{user.displayName}
                        </Typography>
                    : null}
                </Grid>
                <Grid item>
                    { user ?
                        <Button variant="contained" color='secondary' onClick={signOut}>Sign Out</Button> :
                        <Button variant="contained" color='secondary' onClick={logIn}>Log In</Button>
                        }
                </Grid>
            </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;