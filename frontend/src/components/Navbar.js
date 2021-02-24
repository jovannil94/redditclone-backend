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
import Toolbar from '@material-ui/core/Toolbar';
import NativeSelect from '@material-ui/core/NativeSelect';
import Grid from '@material-ui/core/Grid';
import PageviewIcon from '@material-ui/icons/Pageview';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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
    const [anchorEl, setAnchorEl] = React.useState(null);

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

    
    const logIn = () => {
        logInRedirect();
    }
    
    const handleClickOpen = (e) => {
        setAnchorEl(e.currentTarget);
    };
    
    const handleClickClose = () => {
        setAnchorEl(null);
    };
    
    const signOut = () => {
        handleClickClose();
        fire.auth().signOut();
        window.location.href = "./"
    }
      const redirectToSubreddit = () => {
        handleClickClose();
        history.push(`/addsubreddit`);
    }

    useEffect(() => {
        fetchSubreddits()
    }, []);

    return(
        <AppBar style={{height: 60}} position="static">
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
                        color='secondary'
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
                { user ?
                    <div>
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClickOpen}>
                            {user.displayName}
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClickClose}
                        >
                            <MenuItem onClick={redirectToSubreddit}>Create Subreddit</MenuItem>
                            <MenuItem onClick={signOut}>Logout</MenuItem>
                        </Menu>
                    </div>
                    : <Button variant="contained" color='secondary' onClick={logIn}>Log In</Button>
                }
                </Grid>
            </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;