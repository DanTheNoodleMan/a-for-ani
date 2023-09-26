import React, { useState, useEffect } from "react";

function CategoryCard({ socket, handleRandomCategory }) {
    const [category, setCategory] = useState([]); //The letter for this card

    useEffect(() => {
        socket.on("category_generated", (genCategory) => {
            setCategory(genCategory);
        });

        // Clean up the event listener when the component unmounts
        return () => {
            socket.off("category_generated");
        };
    }, [socket, handleRandomCategory]); // Removed 'letter' from the dependency array

    useEffect(() => {
        handleRandomCategory();
    }, []);

    return (
        <div className="categorycard">
            <div className="category-container">
                {category.map((cat, index) => (
                    <div
                        key={index}
                        className={`category category-${index + 1}`}
                    >
                        {cat}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryCard;
