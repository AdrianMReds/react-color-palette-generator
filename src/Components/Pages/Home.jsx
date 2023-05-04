import React from "react";
import { VscSymbolColor } from "react-icons/vsc";
import { Button } from "antd";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          height: "fit-content",
          width: "60%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <VscSymbolColor style={{ fontSize: 60 }} />
        <h1 style={{ fontSize: 40 }}>
          Welcome to the color palette generator!
        </h1>
        <h2 style={{ fontSize: 20, marginBottom: 10 }}>
          Explore colors and generate your own color palettes, copy color rgb
          and hexadecimal codes, and more!
        </h2>
        <img
          src="https://media4.giphy.com/media/l3fQdAyBVHxTLMeTC/giphy.gif"
          style={{ height: "60%", width: "60%", margin: 30 }}
        />
        <NavLink exact to="/generator">
          <Button type="primary">Start generator</Button>
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
