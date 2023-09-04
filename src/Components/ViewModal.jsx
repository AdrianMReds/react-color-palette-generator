import React, { useState } from "react";
import { Modal, notification } from "antd";
import { AiOutlineInfoCircle } from "react-icons/ai";

const ViewModal = ({ modalOpen, setModalOpen, palette }) => {
  const [clicked, setClicked] = useState(0);
  const [hover, setHover] = useState(undefined);
  const [api, contextHolder] = notification.useNotification();
  const handleClose = () => {
    setModalOpen(false);
    setClicked(0);
  };

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

  const hex2rgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    let rgb = r.toString() + "," + g.toString() + "," + b.toString();

    return rgb;
  };

  const copyToClipboard = (copyText) => {
    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText);
    api.success({
      message: `${copyText} copied to the clipboard.`,
      placement: "bottom",
      duration: 2,
    });
  };

  return (
    <Modal
      title="Quick view"
      open={modalOpen}
      onCancel={handleClose}
      footer={null}
      centered={true}
      bodyStyle={{
        height: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {contextHolder}
      <div
        className="colorNames"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "80%",
          height: "25%",
          // textAlign: "-webkit-center",

          color:
            darkOrLight(palette[clicked].color) === "light" ? "black" : "white",
        }}
      >
        <div
          style={{
            width: "49%",
            display: "flex",
            flexDirection: "column",
            cursor: "pointer",
            textAlign: "center",
            backgroundColor: palette[clicked].color,
          }}
        >
          <p>RGB</p>
          <div
            title="Copy to clipboard"
            onClick={() => {
              copyToClipboard(hex2rgb(palette[clicked].color));
            }}
          >
            {hex2rgb(palette[clicked].color)}
          </div>
        </div>
        <div
          style={{
            width: "49%",
            display: "flex",
            flexDirection: "column",
            cursor: "pointer",
            textAlign: "center",
            backgroundColor: palette[clicked].color,
          }}
        >
          <p>HEXCODE</p>
          <div
            title="Copy to clipboard"
            onClick={() => {
              copyToClipboard(palette[clicked].color);
            }}
          >
            {palette[clicked].color}
          </div>
        </div>
      </div>
      <div
        className="quickView"
        style={{
          display: "flex",
          flexDirection: "row",
          width: "80%",
          height: "fit-content",
          textAlign: "-webkit-center",
          margin: 5,
        }}
        onMouseLeave={() => {
          setHover(undefined);
        }}
      >
        {palette.map((item, index) => {
          return (
            <div
              style={{
                width: "20%",
                height: 100,
                backgroundColor: item.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: clicked === index ? 1 : hover === index ? 0.8 : 1,
              }}
              onClick={() => {
                setClicked(index);
              }}
              onMouseEnter={() => {
                setHover(index);
              }}
            >
              {clicked === index ? (
                <AiOutlineInfoCircle
                  style={{ fontSize: 25 }}
                  color={
                    darkOrLight(item.color) === "light" ? "black" : "white"
                  }
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default ViewModal;
