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
    const [subID, setSubID] = useState();
    const [subCount, setSubCount] = useState("");

    const handleSubscribe = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:3001/subscriptions/add`, {
                user_id: userID,
                sub_id: subID
            });
            setSubscribed(true);
        } catch (error) {
           console.log(error) 
        }
    };

    const handleUnsubscribe = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`http://localhost:3001/subscriptions/delete`, {
                data: {
                    user_id: userID,
                    sub_id: subID
                }
            });
            setSubscribed(false);
        } catch (error) {
           console.log(error) 
        }
    };
    
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
                let sub = await axios.get(`http://localhost:3001/subreddits/${subname}`);
                let count = await axios.get(`http://localhost:3001/subscriptions/subreddit/${sub.data.payload.id}`);
                setSubredditDetails(sub.data.payload);
                isUserSubscribed(sub.data.payload.id);
                setSubID(sub.data.payload.id);
                setSubCount(count.data.payload.count);
            } catch (error) {
                console.log(error)
            }
        }; 
        fetchDetails();
    }, [subname, userID, subscribed])

    return (
        <div className="subContainer">
            <div className="subInfo">
                <div className="subHeader">
                    <h1 className="subTitle">{subredditDetails.subname}</h1>
                    <p className="subRoute">/r/{subredditDetails.subname}</p>
                </div>
                {subCount === "1" ?
                <p>{subCount} member</p>
                : <p>{subCount} members</p>
                }
                { subscribed ? 
                <Button variant="contained" color='secondary' type="submit" style={{height:50, width: 100}} onClick={handleUnsubscribe}>Leave</Button>
                :<Button variant="contained" color='secondary' type="submit" style={{height:50, width: 100}} onClick={handleSubscribe}>Join</Button>
                }
            </div>
            <div className="subFeed">
                <DisplayPost choosen={subredditDetails.id}/>
            </div>
            
        </div>
    )
}

export default Subreddit