import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import "../css/Navbar.css";
import logo from "../images/redditLogo.png";
import axios from "axios";
import fire from "./../Fire";
// import { UserContext } from "../provider/UserProvider";


const NavBar = () => {
    const user = fire.auth().currentUser;
    // const [userName, setUserName] = useState("");
    // if (user !== null) {
    //     setUserName(user.displayName)
    // }
    // console.log(userName)
    // console.log(user)
    // const { user } = useContext(UserContext);
    // debugger
    // console.log(user.displayName)
    const [subreddits, setSubreddits] = useState([]);
    const [display, setDisplay] = useState(false);
    const [search, setSearch] = useState("");
    const history = useHistory();
    const homeRedirect = () => history.push(`/`);
    const logInRedirect = () => history.push(`/login`);

    const subredditRedirect = (selected, owner) => {
        history.push({
            pathname: `/subreddit/${selected}`,
            state: { owner: owner }
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
        if(e.currentTarget.value === "Home") {
            homeRedirect();
        } else {
            let sub = e.currentTarget.value.slice(2);
            let res = await axios.get(`http://localhost:3001/subreddits/${sub}`);
            subredditRedirect(sub, res.data.payload.user_id)
        }
    }

    // const handleSearchClick = (e) => {
    //     e.preventDefault();
    //     subredditRedirect(e.currentTarget.textContent)
    // }

    const setSubFilter = subreddit => {
        setSearch(subreddit);
        setDisplay(false);
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
        <nav className="Navbar">
            <img src={logo} className="Logo" alt="" onClick={handleLogoClick}/>
            <select className="NavbarSelect" onChange={handleChange}>
                <option value="Home">Home</option>
                {subreddits.map((subreddit) => 
                    <option key={subreddit.id} value={ subreddit.id, subreddit.name }>/r{subreddit.subname}</option>
                )}
            </select>

            <input type="text" placeholder="Search" onClick={() => setDisplay(!display)} onChange={(e) => setSearch(e.target.value)} value={search}/>
            {display && (
                <div className="SearchContainer">
                    {subreddits.filter(({subname}) => subname.indexOf(search.toLowerCase()) >= 0).map((sub, i) => {
                        return(
                            <div className="SearchResults" key={i} onClick={() => setSubFilter(sub.subname)} value={sub.subname}>
                                <span>
                                    {sub.subname}
                                </span>
                            </div>
                        )
                    })}
                </div>
            )}

            { user ? 
                <button onClick={signOut}>Sign Out</button> :
                <button onClick={logIn}>Login</button>
                }
        </nav>
    )
}

export default NavBar;