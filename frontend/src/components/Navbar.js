import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/Navbar.css";
// import logo from "../images/Reddit-Logo-Horizontal.png";
// import { apiURL } from "../utilities/apiURL";
// import axios from "axios";
// import SubredditIndex from "../helpers/SubredditIndex";

const NavBar = () => {
    const [subreddits, setSubreddits] = useState([]);
    // const API = apiURL();
    
    // const fetchSubreddits = async () => {
    //     try {
    //         let res = await axios({
    //             method: "get",
    //             url: `${API}/subreddits/`
    //         })
    //         setSubreddits(res.data.payload)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    useEffect(() => {
        // fetchSubreddits()
    }, []);

    return(
        <nav className="Navbar">
            {/* <img src={logo} className="Logo" alt="" />
                <SubredditIndex subreddits={subreddits}/> */}
            {/* <select>
                <option value=""  hidden>Home</option>
            </select> */}
            <NavLink className="Links" exact to={"/"}>Home</NavLink>
            <NavLink className="Links" to={"/login"}>Log In</NavLink>
        </nav>
    )
}

export default NavBar;