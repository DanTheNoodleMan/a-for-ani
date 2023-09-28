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
