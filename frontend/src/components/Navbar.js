import React, { useEffect, useState, useContext } from "react";
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
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { UserContext } from "../provider/UserProvider";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

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
    const fireUser = fire.auth().currentUser;
    const [subscriptions, setSubscriptions] = useState([]);
    const [subreddits, setSubreddits] = useState([]);
    const [chosen, setChosen] = useState("");
    const [value, setValue] = useState(subreddits[0]);
    const [inputValue, setInputValue] = useState("");
    const history = useHistory();
    const homeRedirect = () => history.push(`/`);
    const logInRedirect = () => history.push(`/login`);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { userID } = useContext(UserContext);

    const subredditRedirect = (selected) => {
        history.push({
            pathname: `/subreddit/${selected}`
        });
    }
    
    const handleLogoClick = () => {
        setChosen("Home")
        homeRedirect()
    }
    
    const handleChange = async (e) => {
        e.preventDefault();
        let sub = e.target.value
        if(sub !== "") {
            setChosen(sub)
            if(sub === "Home") {
                homeRedirect();
            } else {
                subredditRedirect(sub)
            }
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
        const fetchSubs = async () => {
            try {
                if(userID !== null) {
                    let subscriptions = await axios.get(`http://localhost:3001/subscriptions/user/${userID}`);
                    setSubscriptions(subscriptions.data.payload);
                }
                let subreddits = await axios.get(`http://localhost:3001/subreddits/`);
                setSubreddits(subreddits.data.payload);
            } catch (error) {
                console.log(error)
            }
        }

        const handleSearchClick = (value) => {
            if(value !== undefined || value !== null){
                subredditRedirect(value);
            }
        }
        const handleSearchInput = async (value) => {
            if(value !== undefined || value !== null){
                try {
                    let sub = await axios.get(`http://localhost:3001/subreddits/${value}`);
                    if(sub.data.payload.subname){
                        subredditRedirect(value);
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }

        handleSearchClick(value);
        handleSearchInput(inputValue);
        fetchSubs();
    }, [ userID, value ]);
    
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
                { fireUser ?
                    <Grid item>
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
                                {subscriptions.map((subreddit) => 
                                    <option key={subreddit.id} value={ subreddit.subname }>/r{subreddit.subname}</option>
                                )}
                            </NativeSelect>
                        </FormControl>
                    </Grid>
                    : null
                }
                <Grid item className="navBarSearch">
                    <PageviewIcon fontSize='large' color='secondary'/>
                    <Autocomplete
                        id="combo-box-subs"
                        value={value}
                        onChange={(e, newValue) => {
                            setValue(newValue);
                        }}
                        inputValue={inputValue}
                        onInputChange={(e, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        clearOnEscape
                        options={subreddits}
                        getOptionLabel={(option) => option.subname}
                        style={{ width: 300 }}
                        autoHighlight
                        renderInput={(params) => 
                        <TextField {...params} value={ params } label="Search" variant="outlined"/>}
                    />
                </Grid>
                <Grid item>
                { fireUser ?
                    <div>
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClickOpen}>
                            {fireUser.displayName}
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClickClose}
                        >
                            <MenuItem onClick={redirectToSubreddit}>
                                <AddCircleOutlineIcon fontSize='medium' color='secondary' onClick={redirectToSubreddit}/>
                                Create Subreddit
                            </MenuItem>
                            <MenuItem onClick={signOut}>
                                <ExitToAppIcon fontSize='medium' color='secondary' onClick={signOut}/>
                                Logout
                            </MenuItem>
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