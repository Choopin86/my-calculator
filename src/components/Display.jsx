import React from "react";

const Display = ({ displayValue, showResult }) => {
  return (
    <div className={showResult ? "text-white" : "text-gray-400"}>
      {displayValue}
    </div>
  );
};

export default Display;
