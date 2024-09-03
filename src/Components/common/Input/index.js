import React from "react";
import "./styler.css";
const InputComponent = ({ type, state, required, placeholder, setState }) => {
  return (
    <input
      type={type}
      value={state}
      onChange={(e) => setState(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="custom-input"
    />
  );
};

export default InputComponent;
