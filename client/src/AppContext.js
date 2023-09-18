import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function useAppContext() {
    return useContext(AppContext);
}

export function AppContextProvider({ children }) {
    const [user, setUser] = useState("");
    const [users, setUsers] = useState([]);
    const [room, setRoom] = useState("");
    const [messages, setMessages] = useState([]);
    const [userCount, setUserCount] = useState(0);
    const [usersReady, setUsersReady] = useState([]);
    const [socketToUser, setSocketToUser] = useState({});

    const contextValue = {
        user,
        setUser,
        users,
        setUsers,
        room,
        setRoom,
        messages,
        setMessages,
        userCount,
        setUserCount,
        usersReady,
        setUsersReady,
        socketToUser,
        setSocketToUser,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
}
