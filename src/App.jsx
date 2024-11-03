import React, { useState } from "react";
import Display from "./components/Display";
import Buttons from "./components/Buttons";

const App = () => {
  const [displayValue, setDisplayValue] = useState("0");
  const [operator, setOperator] = useState("");
  const [previousValue, setPreviousValue] = useState("");
  const [showResult, setShowResult] = useState(false);

  const buttons = [
    "AC",
    "C",
    "%",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "=",
  ];
  const operators = ["+", "-", "*", "/"];

  const handleButtonPress = (buttonValue) => {
    if (!isNaN(buttonValue)) {
      //Number button
      setDisplayValue(
        displayValue === "0" ? buttonValue : displayValue + buttonValue
      );
    } else if (operators.includes(buttonValue)) {
      //Operator button
      setPreviousValue(displayValue);
      setOperator(buttonValue);
      setDisplayValue(operator.toString());
    } else if (buttonValue === "C") {
      //Clear button
      setDisplayValue("0");
      setPreviousValue("");
      setOperator("");
    } else if (buttonValue === "=") {
      //Equals button
      const num1 = Number(previousValue);
      const num2 = Number(displayValue);
      let result;

      if (operator === "+") {
        result = num1 + num2;
      } else if (operator === "-") {
        result = num1 - num2;
      } else if (operator === "*") {
        result = num1 * num2;
      } else if (operator === "/") {
        result = num2 === 0 ? "Error" : num1 / num2;
      }

      if (result !== undefined) {
        setDisplayValue(result.toString());
        setShowResult(true);
        setPreviousValue("");
        setOperator("");
      } else {
        setShowResult(false);
      }
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen text-white flex flex-col items-center justify-center">
      <div className="min-w-[320px] bg-black flex flex-col gap-4 p-4 rounded-2xl">
        <div className="overflow-x-auto bg-[#282828] text-3xl min-h-[80px] flex items-end justify-center flex-col p-4 rounded-[10px]">
          <Display displayValue={displayValue} showResult={showResult} />
        </div>
        <div className="">
          <Buttons buttons={buttons} onButtonPress={handleButtonPress} />
        </div>
      </div>
    </div>
  );
};

export default App;
