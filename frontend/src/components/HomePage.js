import React from "react";
import DisplayPost from "../helper/DisplayPosts";
import { useHistory } from "react-router-dom";
import "../css/HomePage.css";
import fire from "../Fire";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const HomePage = () => {
    const user = fire.auth().currentUser;
    const history = useHistory();
    const redirectToPost = () => history.push(`/addpost`);
    const redirectToSubreddit = () => history.push(`/addsubreddit`);

    return(
        <div className="homeContainer">
            <div className="homeFeed">
                {user ? <div>
                    <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                        <Button onClick={redirectToPost}>Create A Post</Button>
                        <Button onClick={redirectToSubreddit}>Create A Subreddit</Button>
                    </ButtonGroup>
                </div> 
                : null}
                <DisplayPost choosen={[]}/>
            </div>
        </div>
    )
}

export default HomePage;