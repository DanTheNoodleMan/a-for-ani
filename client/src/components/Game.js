import React from "react";
import GameBoard from "./Game/GameBoard"
import AnswerInput from "./Game/AnswerInput"
import Timer from "./Game/Timer"

function Game({ socket }) {
    return (
        <div>
            <h1>Game</h1>
            <Timer/>
            <GameBoard socket={socket}/>
        </div>
    );
}

export default Game;
