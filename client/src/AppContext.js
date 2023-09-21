import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function useAppContext() {
    return useContext(AppContext);
}

export function AppContextProvider({ children }) {
    const [answer, setAnswer] = useState("");
    const [answerUser, setAnswerUser] = useState([]); //array index 0 is the answer, index 1 is the user
    const [user, setUser] = useState("");
    const [users, setUsers] = useState([]);
    const [room, setRoom] = useState("");
    const [messages, setMessages] = useState([]);
    const [userCount, setUserCount] = useState(0);
    const [usersReady, setUsersReady] = useState([]);
    const [socketToUser, setSocketToUser] = useState({});

    const contextValue = {
        answer,
        user,
        answerUser,
        setUser,
        users,
        setUsers,
        room,
        setRoom,
        messages,
        setAnswerUser,
        setAnswer,
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
