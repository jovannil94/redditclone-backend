import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import fire from "./../Fire";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [userID, setUserID] = useState(null);

   useEffect(() => {
    const getUserID = async (email) => {
      try {
        let Id = await axios.get(`http://localhost:3001/users/search/${email}`)
        setUserID(Id.data.payload[0].id)
      } catch (error) {
        console.log(error)
      }
    }
    fire.auth().onAuthStateChanged(userAuth => {
      if(userAuth !== null) {
        getUserID(userAuth.email)
      }
    });
   }, []);

    return (
      <UserContext.Provider value={{userID}}>
        {children}
      </UserContext.Provider>
    )
}
export default UserProvider;