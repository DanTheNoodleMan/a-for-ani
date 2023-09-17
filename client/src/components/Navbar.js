import React from "react";
import "../styles/navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt="Logo" />
            </div>
            <div className="navbar-links">
                <ul>
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
