import React from "react";
import "./App.css";
import Register from "./components/Register";
import Game from "./components/Game";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001"); //connect to my server address

function App() {
    return (
        <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Register socket={socket} />}> </Route>
                    <Route path="/game" element={<Game socket={socket} />}> </Route>
                </Routes>
        </BrowserRouter>
    );
}

export default App;
