import React from "react";

const InputComponent = ({ type, id, placeholder, name }) => {
  return (
    <div>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        name={name}
        autoComplete={name}
        required
        className="bg-[#FFFFFF] text-[14px] p-[10px] border-2 border-gray-300 rounded-md w-full"
      />
    </div>
  );
};

export default InputComponent;
