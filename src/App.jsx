import React, { useState } from "react";
import Display from "./components/Display";
import Buttons from "./components/Buttons";

const buttons = [
  { value: "AC", type: "action" },
  { value: "C", type: "action" },
  { value: "%", type: "operator" },
  { value: "/", type: "operator" },
  { value: "7", type: "number" },
  { value: "8", type: "number" },
  { value: "9", type: "number" },
  { value: "*", type: "operator" },
  { value: "4", type: "number" },
  { value: "5", type: "number" },
  { value: "6", type: "number" },
  { value: "-", type: "operator" },
  { value: "1", type: "number" },
  { value: "2", type: "number" },
  { value: "3", type: "number" },
  { value: "+", type: "operator" },
  { value: "0", type: "number" },
  { value: ".", type: "decimal" },
  { value: "=", type: "action" },
];

const App = () => {
  const [display, setDisplay] = useState("0");
  const [showResult, setShowResult] = useState(false);
  const maxDisplayLength = 15;
  const lastChar = display.slice(-1);

  const handleButtonPress = ({ value, type }) => {
    if (display.length >= maxDisplayLength) {
      alert("You have exceeded the maximum number of characters.");
      return;
    }

    switch (type) {
      case "operator":
        if (display === "0") return setDisplay(value);
        if (!isNaN(lastChar)) return setDisplay(display + value);
        if (lastChar && type === "operator")
          return setDisplay(display.slice(0, -1) + value);
      case "number":
        return setDisplay(display === "0" ? value : display + value);
      case "decimal":
        if (lastChar === ".") return;
        if (isNaN(lastChar)) setDisplay(display + "0" + value);

        return setDisplay(display + value);
    }
  };

  const handleActions = ({ value, type }) => {
    switch (value) {
      case "AC":
        setDisplay("0");
        setShowResult(false);
        break;

      case "C":
        if (display === "0") return;
        if (display.length === 1) {
          setDisplay("0");
        } else {
          setDisplay(display.slice(0, -1));
        }
        break;

      case "=":
        const sanitizedDisplay = isNaN(display.slice(-1))
          ? display.slice(0, -1)
          : display;

        try {
          const result = eval(sanitizedDisplay).toString();
          setDisplay(result);
          setShowResult(true);
        } catch (error) {
          alert("Invalid expression");
          setDisplay("0"); // Reset display in case of error
        }
        break;

      default:
        break;
    }
  };

  const handleClicks = ({ value, type }) => {
    if (type === "action") {
      handleActions({ value, type });
      return;
    }
    handleButtonPress({ value, type });
  };

  return (
    <div className="bg-slate-900 min-h-screen text-white flex flex-col items-center justify-center">
      <div className="min-w-80 bg-black flex flex-col gap-4 p-4 rounded-2xl">
        <div className="overflow-x-auto bg-[#282828] text-3xl min-h-20 flex items-end justify-center flex-col p-4 rounded-[10px]">
          <Display display={display} showResult={showResult} />
        </div>
        <div className="">
          <Buttons buttons={buttons} onButtonPress={handleClicks} />
        </div>
      </div>
    </div>
  );
};

export default App;
