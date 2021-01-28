import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../css/Navbar.css";
import logo from "../images/redditLogo.png";
import axios from "axios";


const NavBar = () => {
    const user_id= localStorage.getItem("currentUser");
    const [subreddits, setSubreddits] = useState([]);
    const [display, setDisplay] = useState(false);
    const [search, setSearch] = useState("");
    const history = useHistory();
    const subredditRedirect = (selected) => history.push(`/subreddit/${selected}`);
    const homeRedirect = () => history.push(`/`);
    const logInRedirect = () => history.push(`/login`);
    
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

    const handleChange = (e) => {
        e.preventDefault();
        if(e.currentTarget.value === "Home") {
            homeRedirect();
        } else {
            let sub = e.currentTarget.value.slice(2);
            subredditRedirect(sub)
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
        localStorage.clear();
        window.location.href = "./"
        // window.location.reload()
        //fix signout to always redirect to home!
    }

    const logIn = () => {
        localStorage.clear();
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

            { user_id > 0 ? 
                <button onClick={signOut}>Sign Out</button> :
                <button onClick={logIn}>Log In</button>
                }
        </nav>
    )
}

export default NavBar;