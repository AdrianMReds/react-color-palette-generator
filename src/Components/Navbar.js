import React, { useState } from "react";
import { FaBars, FaTimes, FaPaintBrush } from "react-icons/fa";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <React.Fragment>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            Color Palette Generator
            <FaPaintBrush style={{ height: 20, marginLeft: 5 }} />
          </NavLink>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink exact to="/" className="nav-links" onClick={handleClick}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/generator"
                className="nav-links"
                onClick={handleClick}
              >
                Generator
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink
                exact
                to="/saved"
                className="nav-links"
                onClick={handleClick}
              >
                Saved
              </NavLink>
            </li> */}
            <li className="nav-item">
              <NavLink
                exact
                to="/about"
                className="nav-links"
                onClick={handleClick}
              >
                About
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {click ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default Navbar;
