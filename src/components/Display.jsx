import React from "react";

const Display = ({ display, showResult }) => {
  return (
    <div className={showResult ? "text-white" : "text-gray-400"}>{display}</div>
  );
};

export default Display;
