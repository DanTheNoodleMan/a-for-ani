import React, { useEffect, useState } from "react";
import "../../styles/game.css";

function LetterCard({ socket, cardId, handleRandomLetter}) {
    const [letter, setLetter] = useState(""); //The letter for this card

    useEffect(() => {
        socket.on("letter_generated", (genLetter) => {
            // Update the letter for this card if the cardId matches
            if (genLetter[cardId]) {
                setLetter(genLetter[cardId]);
            }
        });

        // Clean up the event listener when the component unmounts
        return () => {
            socket.off("letter_generated");
        };
    }, [socket, cardId]); // Removed 'letter' from the dependency array

    useEffect(() => {
        handleRandomLetter();
    }, []);

    return cardId === 3 ? (
        <div className="lettercard mid">
            <button onClick={handleRandomLetter}>Press me for a letter</button>
            <div className="letter">{letter}</div>
        </div>
    ) : (
        <div className="lettercard">
            <button onClick={handleRandomLetter}>Press me for a letter</button>
            <div className="letter">{letter}</div>
        </div>
    );
}

export default LetterCard;
