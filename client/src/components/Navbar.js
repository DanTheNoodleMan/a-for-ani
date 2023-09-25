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
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/about">About</a>
                    </li>
                    <li>
                        <a href="/contact">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
