import React from "react";
import "../../styles/game.css";

function AnswerInput({ socket, user, users, answer, setAnswer }) {

    const handleSendAnswer = (e) => {
        e.preventDefault();
        console.log(
            "ANSWER_INPUT: Answer submitted: " + answer + " by " + user
        );
        socket.emit("answer_submitted", answer, user);
    };

    return (
        <div className="answer-input">
            <form className="form" onSubmit={handleSendAnswer}>
                <input
                    type="text"
                    placeholder="Send your answer"
                    className="answer"
                    onChange={(e) => setAnswer(e.target.value)}
                />
                <button className="sendBtn">SEND</button>
            </form>
        </div>
    );
}

export default AnswerInput;
