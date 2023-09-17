import React from "react";
import LetterCard from "./LetterCard";
import CategoryCard from "./CategoryCard";
import AnswerInput from "./AnswerInput";
import Timer from "./Timer";



function GameBoard({socket}) {
    return (
        <div>
            <h1>GameBoard</h1>
            <LetterCard socket={socket} cardId={1}/>
            <LetterCard socket={socket} cardId={2}/>
            <LetterCard socket={socket} cardId={3}/>
            <CategoryCard socket={socket}/>
        </div>
    );
}

export default GameBoard;
