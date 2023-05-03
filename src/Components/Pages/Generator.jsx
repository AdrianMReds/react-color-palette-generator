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
  console.log(`Random: ${random}`);
  console.log(`Final color ${finalColor}`);
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

  // useEffect(() => {
  //   console.log("New render");
  // }, [palette]);

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
}) => {
  return (
    <div
      className="colorBar"
      style={{
        width: "20%",
        backgroundColor: c,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="actionsBar"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          className="actionsBar-action"
          style={{
            height: "60px",
            width: "60px",
          }}
        >
          <VscSymbolColor style={{ fontSize: 35 }} />
        </div>
        <div
          className="actionsBar-action"
          style={{
            height: "60px",
            width: "60px",
          }}
          onClick={changeBlocked}
        >
          {b ? (
            <BsFillLockFill style={{ fontSize: 35 }} />
          ) : (
            <BsFillUnlockFill style={{ fontSize: 35 }} />
          )}
        </div>
        <div
          className="actionsBar-action"
          style={{
            height: "50px",
            width: "150px",
          }}
        >
          <h2>{c}</h2>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <div className="actionsBar-action" onClick={moveLeft}>
            <VscArrowLeft style={{ fontSize: 35 }} />
          </div>
          <div className="actionsBar-action" onClick={moveRight}>
            <VscArrowRight style={{ fontSize: 35 }} />
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
