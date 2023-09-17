import React, { useEffect, useState } from "react";

function LetterCard({ socket, cardId }) {
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

    const handleRandomLetter = () => {
        // Emit the 'generate_letters' event to request a new letter for this card
        socket.emit("generate_letter", cardId);
    };

    return (
        <div>
            <h1>LetterCard</h1>
            <button onClick={handleRandomLetter}>Press me for a letter</button>
            <div className="letter-card">{letter}</div>
        </div>
    );
}

export default LetterCard;
