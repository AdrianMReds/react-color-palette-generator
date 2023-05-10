import React from "react";
import { VscSymbolColor } from "react-icons/vsc";
import { Button } from "antd";
import { NavLink } from "react-router-dom";
import "./Styles/Home.css";

const Home = () => {
  return (
    <div className="main-div">
      <div className="content-div">
        <VscSymbolColor style={{ fontSize: 60 }} />
        <h1>Welcome to the color palette generator!</h1>
        <h2>
          Explore colors and generate your own color palettes, copy color rgb
          and hexadecimal codes, and more!
        </h2>
        <img
          className="home-img"
          src="https://media4.giphy.com/media/l3fQdAyBVHxTLMeTC/giphy.gif"
          style={{ height: "60%", width: "60%", margin: 30 }}
        />
        <NavLink exact to="/generator">
          <Button className="home-btn" type="primary" size="large">
            Start generator
          </Button>
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
