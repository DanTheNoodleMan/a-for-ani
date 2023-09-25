import React, { useEffect, useState } from "react";
import "../../styles/game.css";
import cardImg from "../../assets/card.png";

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
        handleRandomLetter(cardId);
    }, []);

    return cardId === 3 ? (
        <div className="lettercard mid">
            <img src={cardImg} alt="Card Design" />
            <div className="letter">{letter}</div>
        </div>
    ) : (
        <div className={`lettercard lettercard-${cardId}`}>
            <img src={cardImg} alt="Card Design" />
            <div className="letter">{letter}</div>
        </div>
    );
}

export default LetterCard;
