import React from "react";
import DisplayPost from "../helper/DisplayPosts";
import { useHistory } from "react-router-dom";
import "../css/HomePage.css";
import fire from "../Fire";
import TextField from '@material-ui/core/TextField';
import RedditIcon from '@material-ui/icons/Reddit';
import ImageIcon from '@material-ui/icons/Image';
import TollIcon from '@material-ui/icons/Toll';

const HomePage = () => {
    const user = fire.auth().currentUser;
    const history = useHistory();
    const redirectToPost = () => history.push(`/addpost`);
    return(
        <div className="homeContainer">
            <div className="homeFeed">
                { user ? 
                    <div className="homeCreatePost">
                        <RedditIcon className="icon" fontSize='large' color='secondary' onClick={redirectToPost}/>
                        <TextField id="outlined-basic" color='secondary' label="Create Post" variant="outlined" style={{width: 750}} onClick={redirectToPost}/>
                        <ImageIcon className="icon" fontSize='large' color='secondary' onClick={redirectToPost}/>
                        <TollIcon className="icon" fontSize='large' color='secondary' onClick={redirectToPost}/>
                    </div>
                    : null
                }
                <DisplayPost choosen={[]}/>
            </div>
        </div>
    )
}

export default HomePage;