import React from "react";
import { useNavigate } from "react-router-dom";

const CardButtonComponent = ({ label, width, color, category }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/shop/${category}`);
  };
  return (
    <div>
      <button
        className={`${width} h-[300px]  border-gray-800 text-3xl text-center flex items-center justify-center rounded-2xl hover:scale-105 transform transition duration-300 ${color}`}
        onClick={handleButtonClick}
      >
        {label}
      </button>
    </div>
  );
};

export default CardButtonComponent;
