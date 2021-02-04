import React, { useState, useEffect, createContext } from "react";
import { auth } from "../firebase";

export const UserContext = createContext({ user: null });

const UserProvider = () => {
    const [user, setUser] = useState(null)

   useEffect(() => {
        auth.onAuthStateChanged(userAuth => {
        setUser(userAuth)})
   }, [])

    return (
      <UserContext.Provider value={user}>
        {this.props.children}
      </UserContext.Provider>
    )
}
export default UserProvider;