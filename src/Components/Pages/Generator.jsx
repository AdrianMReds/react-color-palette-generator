import React, { useState, useEffect } from "react";
import {
  BsSuitHeart,
  BsSuitHeartFill,
  BsEyeFill,
  BsFillLockFill,
  BsFillUnlockFill,
} from "react-icons/bs";
import {
  VscArrowLeft,
  VscArrowRight,
  VscDebugRestart,
  VscSymbolColor,
} from "react-icons/vsc";
import "./Pages.css";

const rgbToHex = (nums) => {
  let hexcode = "";
  for (let i = 0; i < 3; i++) {
    let twoletters = nums[i].toString(16);
    if (twoletters.length < 2) {
      hexcode += "0" + twoletters;
    } else {
      hexcode += twoletters;
    }
  }
  hexcode = hexcode.toUpperCase();
  return hexcode;
};

const generateColor = () => {
  const random = [];
  let finalColor;
  for (let i = 0; i < 3; i++) {
    random.push(Math.floor(Math.random() * 256));
  }
  finalColor = "#" + rgbToHex(random);
  return finalColor;
};

const Generator = () => {
  const [palette, setPalette] = useState([
    { color: generateColor(), blocked: false },
    { color: generateColor(), blocked: false },
    { color: generateColor(), blocked: false },
    { color: generateColor(), blocked: false },
    { color: generateColor(), blocked: false },
  ]);
  const [selected, setSelected] = useState(undefined);

  const restartColors = () => {
    let tempPalette = [...palette];
    setPalette([
      tempPalette[0].blocked
        ? tempPalette[0]
        : { color: generateColor(), blocked: false },
      tempPalette[1].blocked
        ? tempPalette[1]
        : { color: generateColor(), blocked: false },
      tempPalette[2].blocked
        ? tempPalette[2]
        : { color: generateColor(), blocked: false },
      tempPalette[3].blocked
        ? tempPalette[3]
        : { color: generateColor(), blocked: false },
      tempPalette[4].blocked
        ? tempPalette[4]
        : { color: generateColor(), blocked: false },
    ]);
  };

  const changeColor = (i, newColor) => {
    let tempPalette = [...palette];
    tempPalette[i].color = newColor;
    setPalette(tempPalette);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ToolsBar height={"8vh"} restartColors={restartColors} />
      <div
        className="palette"
        style={{ display: "flex", flexDirection: "row", height: "82vh" }}
        onMouseLeave={() => setSelected(undefined)}
      >
        {palette.map((color, index) => {
          return (
            <ColorBar
              c={color.color}
              b={color.blocked}
              changeColor={() => {}}
              changeBlocked={() => {
                let tempPalette = [...palette];
                let actual = tempPalette[index].blocked;
                tempPalette[index].blocked = !actual;
                setPalette(tempPalette);
              }}
              moveLeft={() => {
                let tempPalette = [...palette];
                if (index === 0) {
                  return;
                } else {
                  console.log("Movimiento a la izquierda");
                  let tempColor = palette[index - 1];
                  console.log(tempPalette);
                  console.log(`Izquierda: ${JSON.stringify(tempColor)}`);
                  console.log(`Derecha: ${JSON.stringify(color)}`);
                  tempPalette[index - 1] = color;
                  tempPalette[index] = tempColor;
                  console.log(tempPalette);
                  setPalette(tempPalette);
                }
              }}
              moveRight={() => {
                let tempPalette = [...palette];
                if (index === palette.length - 1) {
                  return;
                } else {
                  let tempColor = palette[index + 1];
                  tempPalette[index + 1] = color;
                  tempPalette[index] = tempColor;
                  setPalette(tempPalette);
                }
              }}
              setSelected={() => setSelected(index)}
              show={selected === index ? true : false}
            />
          );
        })}
      </div>
    </div>
  );
};

const ColorBar = ({
  c,
  b,
  changeColor,
  changeBlocked,
  moveLeft,
  moveRight,
  setSelected,
  show,
}) => {
  const darkOrLight = (color) => {
    var r, g, b, hsp;

    // Function extracted from https://awik.io/determine-color-bright-dark-using-javascript/
    //Convert it to RGB: http://gist.github.com/983661
    color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&"));

    r = color >> 16;
    g = (color >> 8) & 255;
    b = color & 255;

    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

    // Using the HSP value, determine whether the color is light or dark
    if (hsp > 127.5) {
      return "light";
    } else {
      return "dark";
    }
  };

  return (
    <div
      className="colorBar"
      style={{
        width: "20%",
        backgroundColor: c,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
      onMouseEnter={setSelected}
    >
      <div
        className="actionsBar"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 55,
        }}
      >
        <div
          className="actionsBar-action"
          style={{
            height: "60px",
            width: "60px",
            display: show ? "flex" : "none",
          }}
        >
          <VscSymbolColor
            style={{ fontSize: 35 }}
            color={darkOrLight(c) === "light" ? "black" : "white"}
          />
        </div>
        <div
          className="actionsBar-action"
          style={{
            height: "60px",
            width: "60px",
            display: b || show ? "flex" : "none",
          }}
          onClick={changeBlocked}
        >
          {b ? (
            <BsFillLockFill
              style={{ fontSize: 35 }}
              color={darkOrLight(c) === "light" ? "black" : "white"}
            />
          ) : (
            <BsFillUnlockFill
              style={{ fontSize: 35 }}
              color={darkOrLight(c) === "light" ? "black" : "white"}
            />
          )}
        </div>
        <div
          className="actionsBar-action"
          style={{
            height: "50px",
            width: "150px",
          }}
        >
          <h2 style={{ color: darkOrLight(c) === "light" ? "black" : "white" }}>
            {c}
          </h2>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <div className="actionsBar-action" onClick={moveLeft}>
            <VscArrowLeft
              style={{ fontSize: 35 }}
              color={darkOrLight(c) === "light" ? "black" : "white"}
            />
          </div>
          <div className="actionsBar-action" onClick={moveRight}>
            <VscArrowRight
              style={{ fontSize: 35 }}
              color={darkOrLight(c) === "light" ? "black" : "white"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ToolsBar = ({ height, restartColors }) => {
  return (
    <div
      className="toolsBar"
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: height,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        className="toolsBar-text"
        style={{
          width: "30%",
          marginLeft: 10,
          borderRight: "1px solid lightgray",
        }}
      >
        <p style={{ textAlign: "left", fontSize: 18 }}>
          Change or block colors and make a color palette!
        </p>
      </div>
      <div className="toolsBar-buttons" style={{ marginRight: 20 }}>
        <button className="toolsBar-btn" onClick={restartColors}>
          {<VscDebugRestart />} Generate
        </button>
        <button className="toolsBar-btn">{<BsEyeFill />} View</button>
        <button className="toolsBar-btn">{<BsSuitHeart />} Save</button>
      </div>
    </div>
  );
};

export default Generator;
