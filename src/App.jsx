import React, { useState } from "react";
import Display from "./components/Display";
import Buttons from "./components/Buttons";
import { type } from "@testing-library/user-event/dist/type";

const App = () => {
  const [display, setDisplay] = useState("0");
  const [showResult, setShowResult] = useState(false);
  const maxDisplayLength = 15;
  const lastChar = display.slice(-1);

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

  const handleButtonPress = ({ value, type }) => {
    if (display.length < maxDisplayLength) {
      if (type === "operator" && display === "0") {
        setDisplay(value);
      } else if (type === "number") {
        setDisplay(display === "0" ? value : display + value);
      } else if (type === "operator") {
        if (!isNaN(lastChar)) {
          setDisplay(display + value);
        } else if (lastChar && type === "operator") {
          setDisplay(display.slice(0, -1) + value);
        }
      } else if (type === "decimal") {
        if (lastChar === ".") {
          return;
        } else if (isNaN(lastChar)) {
          setDisplay(display + "0" + value);
        } else {
          setDisplay(display + value);
        }
      }
    }
  };

  const handleActions = ({ value, type }) => {
    if (type === "action") {
      if (value === "AC") {
        setDisplay("0");
        setShowResult(false);
      } else if (value === "C") {
        if (display === "0") {
          return;
        } else if (display.length === 1) {
          setDisplay("0");
        } else {
          setDisplay(display.slice(0, -1));
        }
      } else if (value === "=") {
        {
          setDisplay(display === "0" ? "0" : eval(display).toString());
          setShowResult(true);
        }
      }
    }
  };

  const handleClicks = ({ value, type }) => {
    if (type === "action") {
      handleActions({ value, type });
    } else {
      handleButtonPress({ value, type });
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen text-white flex flex-col items-center justify-center">
      <div className="min-w-[320px] bg-black flex flex-col gap-4 p-4 rounded-2xl">
        <div className="overflow-x-auto bg-[#282828] text-3xl min-h-[80px] flex items-end justify-center flex-col p-4 rounded-[10px]">
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
