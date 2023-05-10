import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "antd";
import "./Styles/About.css";

const About = () => {
  return (
    <>
      <div className="main-div">
        <div className="content-div">
          <div>
            <p>
              This webpage was made by{" "}
              <a target="_blank" href="https://github.com/AdrianMReds">
                @AdrianMReds
              </a>
            </p>{" "}
            <br />
            <p>
              This project was inspired in{" "}
              <a target="_blank" href="https://coolors.co">
                coolors.co
              </a>
            </p>{" "}
            <br />
            <p>
              The only intention of making this project was learning more about
              ReactJS and Firebase, along with other web development skills.
            </p>{" "}
            <br />
            <p>
              You can generate color palettes, block colors, copy their hexcodes
              or RGB codes (on the view page) to the clipboard, feel free to use
              it as you like.
            </p>{" "}
            <br />
            <NavLink exact to="/generator">
              <Button type="primary" size="medium">
                Start generator
              </Button>
            </NavLink>
          </div>
        </div>
        <div
          className="about-img"
          style={{ width: "50%", alignItems: "center" }}
        >
          <img
            src="https://www.vectorlogo.zone/logos/reactjs/reactjs-ar21.png"
            alt="ReactLogo"
            style={{ height: "70%", width: "70%" }}
          />
        </div>
      </div>
    </>
  );
};

export default About;
