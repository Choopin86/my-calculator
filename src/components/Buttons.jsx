import React from "react";

const Buttons = ({ buttons, onButtonPress }) => {
  return (
    <div
      className="grid grid-cols-4 gap-[0.3rem] text-xl 
    items-center justify-center p-0.5 rounded-[5px]"
    >
      {buttons.map(({ value, type }) => (
        <button
          className={`${
            value === "="
              ? "col-span-2 bg-[#339c97] text-[#1a261a] font-semibold hover:bg-[#45c0b9]"
              : "bg-[#141414] hover:bg-[#4ccdc742]"
          } py-5 px-6 rounded-[5px]`}
          key={value}
          onClick={() => onButtonPress({ value, type })}
        >
          {value}
        </button>
      ))}
    </div>
  );
};

export default Buttons;
