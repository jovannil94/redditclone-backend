import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DisplayPost from "../helper/DisplayPosts";
import { UserContext } from "../provider/UserProvider";
import Button from '@material-ui/core/Button';
import "../css/Subreddit.css"

const Subreddit = () => {
    const [subredditDetails, setSubredditDetails] = useState([]);
    const { subname } = useParams();
    const { userID } = useContext(UserContext);
    const [subscribed, setSubscribed] = useState(false);
    
    useEffect(() => {
        const isUserSubscribed = async (id) => {
            try {
                let res = await axios.get(`http://localhost:3001/subscriptions/usersubbed/${userID}/${id}`);
                if(res.data.payload) {
                    setSubscribed(true);
                }
            } catch (error) {
                setSubscribed(false);
                console.log(error)
            }
        };

        const fetchDetails = async () => {
            try {
                let res = await axios.get(`http://localhost:3001/subreddits/${subname}`);
                setSubredditDetails(res.data.payload);
                isUserSubscribed(res.data.payload.id);
            } catch (error) {
                console.log(error)
            }
        }; 
        fetchDetails();
    }, [subname, userID])

    return (
        <div className="subContainer">
            <div className="subInfo">
                <div className="subHeader">
                    <h1 className="subTitle">{subredditDetails.subname}</h1>
                    <p className="subRoute">/r/{subredditDetails.subname}</p>
                </div>
                { subscribed ? 
                <Button variant="contained" color='secondary' type="submit" style={{height:50, width: 100}}>Leave</Button>
                :<Button variant="contained" color='secondary' type="submit" style={{height:50, width: 100}}>Join</Button>
                }
            </div>
            <div className="subFeed">
                <DisplayPost choosen={subredditDetails.id}/>
            </div>
            
        </div>
    )
}

export default Subreddit