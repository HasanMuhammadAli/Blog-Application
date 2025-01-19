import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            {/* Logo positioned to the left */}
            <div className="navbar-logo">
                <Link to="/">Blog App</Link>
            </div>
            
            {/* Navigation links aligned to the right */}
            <ul className="navbar-menu">
                <li className="navbar-item">
                    <Link to="/" className="navbar-links">Home</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/blogs" className="navbar-links">Blog List</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/add-blog" className="navbar-links">Add Blog</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
