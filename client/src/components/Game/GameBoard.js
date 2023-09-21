import React from "react";
import LetterCard from "./LetterCard";
import CategoryCard from "./CategoryCard";
import AnswerInput from "./AnswerInput";
import Timer from "./Timer";
import "../../styles/game.css";

function GameBoard({ socket }) {
    const handleRandomLetter = (cardId) => {
        socket.emit("generate_letter", cardId);
    };
    const handleRandomCategory = () => {
        socket.emit("generate_category");
    };

    const refreshValues = () => {
        handleRandomLetter(1);
        handleRandomLetter(2);
        handleRandomLetter(3);
        handleRandomCategory();
    };

    return (
        <>
            <button onClick={() => refreshValues()}>Refresh all values</button>
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
