import React from "react";
import "../styles/InputDegree.css"

export const InputDegree = ({ name, onChange, value }) => {
  return (
    <div className="InputDegree">
      <p className="text">{name}:</p>
      <p className="number">{Number(value).toFixed(2)}°</p>
      <input
        type="range"
        min="0"
        max="180"
        step="0.01"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
