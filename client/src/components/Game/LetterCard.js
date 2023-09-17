import React, { useState } from "react";

function LetterCard() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lettersArray = letters.split("");

    const randomIndex = (array) => {
        return Math.floor(Math.random() * array.length);
    };

    const randomLetters = () => {
        let threeLetters = [];
        for (let i = 0; i < 3; i++) {
            threeLetters.push(lettersArray.at(randomIndex(lettersArray)));
        }
        console.log(threeLetters);
        return threeLetters;
    };

    const [threeLetters, setThreeLetters] = useState(randomLetters()); //List of 3 random letters

    const handleRandomLetters = () => {
        setThreeLetters(randomLetters());
    };

    return (
        <div>
            <h1>LetterCard</h1>
            <button onClick={handleRandomLetters}>
                Press me for 3 letters
            </button>
            <div className="letter-card">
                {threeLetters.map((letter, index) => (
                    <p key={index}>{letter}</p>
                ))}
            </div>
        </div>
    );
}

export default LetterCard;
