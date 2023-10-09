import React from "react";
import "../styles/navbar.css";

const Navbar = ({ user }) => {
    return (
        <div className="navbar">
            <div className="navbar-logo">
                <a className="logo" href="/">
                    A for Ani
                </a>
            </div>
            <div className="navbar-links">
                <ul>
                    <li className="user">{user}</li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
