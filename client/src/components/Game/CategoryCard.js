import React, { useState, useEffect } from "react";

function CategoryCard({ socket }) {
    const [category, setCategory] = useState([]); //The letter for this card

    useEffect(() => {
        socket.on("category_generated", (genCategory) => {
            setCategory(genCategory);
        });

        // Clean up the event listener when the component unmounts
        return () => {
            socket.off("category_generated");
        };
    }, [socket]); // Removed 'letter' from the dependency array

    const handleRandomCategory = () => {
        // Emit the 'generate_letters' event to request a new letter for this card
        socket.emit("generate_category");
    };
    return (
        <div>
            <h1>CategoryCard</h1>
            <button onClick={handleRandomCategory}>
                Press me for a Category
            </button>
            {category.map((cat, index) => (
                <div key={index} className="category-card">{cat}</div>
            ))}
        </div>
    );
}

export default CategoryCard;
