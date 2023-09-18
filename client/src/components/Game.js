import React from "react";
import GameBoard from "./Game/GameBoard"
import AnswerInput from "./Game/AnswerInput"
import Timer from "./Game/Timer"
import "../styles/game.css"

function Game({ socket }) {
    return (
        <div className="game">
            <h1>Game</h1>
            <Timer/>
            <GameBoard socket={socket}/>
            <AnswerInput socket={socket}/>
        </div>
    );
}

export default Game;
