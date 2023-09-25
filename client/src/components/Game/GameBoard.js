import React from "react";
import LetterCard from "./LetterCard";
import CategoryCard from "./CategoryCard";
import AnswerInput from "./AnswerInput";
import Timer from "./Timer";
import "../../styles/game.css";
import { VscDebugRestart } from "react-icons/vsc";

function GameBoard({
    socket,
    handleRefreshValues,
    handleRandomCategory,
    handleRandomLetter,
    renderScores,
}) {
    return (
        <>
            <div className="gameboard">
                <button
                    className="reset-button"
                    onClick={() => handleRefreshValues()}
                >
                    <VscDebugRestart />
                </button>
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
                {renderScores()} {/* Display Scores */}
            </div>
        </>
    );
}

export default GameBoard;
