import React from "react";
import "../styles/tutorial.css";
import TutorialCard from "./TutorialCard";

function Tutorial() {
    const tut1Title = (
        <span>Create a Room <br /> Join a Game!</span>
    );

    return (
        <div className="tutorial">
            <div className="tutorial-cards">
                <TutorialCard
                    title={tut1Title}
                    description="Create a room/Join a game with a custom code. Share the code with your friends!"
                    color="#FEE440"
                />
                <TutorialCard
                    title="Be the fastest to answer the question!"
                    description="Give the quickest answer to match a category with a letter. Vote whether it's a valid answer or not!"
                    color="#00bbf9"
                />
                <TutorialCard
                    title="Build your A before your opponents!"
                    description="Keep the cards you win, first to build their A wins!"
                    color="#f15bb5"
                />
            </div>
        </div>
    );
}

export default Tutorial;
