import React from "react";
import GameBoard from "./Game/GameBoard"
import CategoryCard from "./Game/CategoryCard"
import LetterCard from "./Game/LetterCard"
import AnswerInput from "./Game/AnswerInput"
import Timer from "./Game/Timer"

function Game() {
    return (
        <div>
            <h1>Game</h1>
            <LetterCard/>
        </div>
    );
}

export default Game;
