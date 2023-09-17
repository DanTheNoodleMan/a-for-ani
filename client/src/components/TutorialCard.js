import React from "react";
import "../styles/tutorial.css";

function TutorialCard({ title, description, color}) {
    return (
        <div className="tutorial-card" style={{background: `linear-gradient(to bottom, ${color} 0%, ${color} 53%, #fff 53%, #fff 100%)`,
    }}>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
}

export default TutorialCard;
