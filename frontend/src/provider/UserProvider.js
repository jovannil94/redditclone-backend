import React, { useState, useEffect, createContext } from "react";
import fire from "./../Fire";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

   useEffect(() => {
        fire.auth().onAuthStateChanged(userAuth => {
        setUser(userAuth)})
   }, []);

    return (
      <UserContext.Provider value={{user}}>
        {children}
      </UserContext.Provider>
    )
}
export default UserProvider;