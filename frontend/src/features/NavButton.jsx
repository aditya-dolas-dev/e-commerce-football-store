import React from "react";
import { useNavigate } from "react-router-dom";

const NavButton = ({ buttonName, color, text, border }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (buttonName === "Home") {
      navigate("/");
    } else if (buttonName === "Shop") {
      navigate("/shop");
    } else if (buttonName === "Threads") {
      navigate("/threads");
    } else if (buttonName === "Login") {
      navigate("/login");
    } else if (buttonName === "Signup") {
      navigate("/signup");
    }
  };

  return (
    <div>
      <button
        className={`px-4 py-0.5 mt-0 border-b-[5px] border-b-double border-t-[1px] border-l-[1px] border-r-[1px]  border-b-black rounded-full text-black transition ${text} ${color} ${border}`}
        onClick={handleClick}
      >
        {buttonName}
      </button>
    </div>
  );
};

export default NavButton;
