import React from "react";
import "./App.css";
import Register from "./components/Register";
import Game from "./components/Game";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import { AppContextProvider } from "./AppContext";

const socket = io.connect("https://a-for-ani.up.railway.app/", {
    extraHeaders: {
        "Access-Control-Allow-Origin": "*",
    },
}); //connect to my server address

// const socket = io.connect("http://localhost:3001"); //local testing and updating

//TODO: reset answers even if users dont vote otherwise it will be stuck on the same answers even for users playing a different game
//TODO: Effectively destroy group/room/game when users leave so the code can be repurposed
//TODO: Figure out if users in a different game are affected by the same socket events
//TODO: Fix it so when users vote to not restart the game they leave and the rooms is properly destroyed
//TODO: MAKE SURE emitting to specific rooms with .to(roomId). Pass rooms in all events

function App() {
    return (
        <AppContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Register socket={socket} />}>
                        {" "}
                    </Route>
                    <Route path="/game" element={<Game socket={socket} />}>
                        {" "}
                    </Route>
                </Routes>
            </BrowserRouter>
        </AppContextProvider>
    );
}

export default App;
