import React from "react";
import LetterCard from "./LetterCard";
import CategoryCard from "./CategoryCard";
import AnswerInput from "./AnswerInput";
import Timer from "./Timer";
import "../../styles/game.css";

function GameBoard({ socket, handleRefreshValues, handleRandomCategory, handleRandomLetter }) {


    return (
        <>
            <button onClick={() => handleRefreshValues()}>Refresh all values</button>
            <div className="gameboard">
                <LetterCard
                    socket={socket}
                    cardId={1}
                    handleRandomLetter={handleRandomLetter}
                />
                <CategoryCard
                    socket={socket}
                    handleRandomCategory={handleRandomCategory}
                />
                <LetterCard
                    socket={socket}
                    cardId={2}
                    handleRandomLetter={handleRandomLetter}
                />
                <LetterCard
                    socket={socket}
                    cardId={3}
                    className="mid"
                    handleRandomLetter={handleRandomLetter}
                />
            </div>
        </>
    );
}

export default GameBoard;
