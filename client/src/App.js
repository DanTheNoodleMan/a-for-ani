import React from "react";
import "./App.css";
import Register from "./components/Register";
import Game from "./components/Game";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import { AppContextProvider } from './AppContext'; // Import the context provider

const socket = io.connect("https://a-for-ani.adaptable.app/"); //connect to my server address

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
