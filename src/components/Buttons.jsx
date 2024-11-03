import React from "react";

const Buttons = ({ buttons, onButtonPress }) => {
  return (
    <div
      className="grid grid-cols-[repeat(4,1fr)] gap-[0.3rem] text-xl 
    items-center justify-center p-0.5 rounded-[5px]"
    >
      {buttons.map((button) => (
        <button
          className={`${
            button === "="
              ? "col-span-2 bg-[#4ccdc6] text-[#1a261a] font-semibold hover:bg-[#58e9e2]"
              : "bg-[#141414] hover:bg-[#4ccdc742]"
          } py-5 px-6 rounded-[5px]`}
          key={button}
          onClick={() => onButtonPress(button)}
        >
          {button}
        </button>
      ))}
    </div>
  );
};

export default Buttons;
