import React from "react";
import "./style.css";
const Button = ({ text, onClick, disabled, style, podcast_class }) => {
  return (
    <div
      onClick={onClick}
      className={podcast_class ? "podbtn" : "custom-btn"}
      disabled={disabled}
      style={style}
    >
      {text}
    </div>
  );
};

export default Button;
