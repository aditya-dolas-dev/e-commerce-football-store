import React from "react";
import { useNavigate } from "react-router-dom";

const NavButton = ({ buttonName }) => {
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
        className="text-white bg-gray-700 hover:bg-white hover:text-black rounded-2xl px-3 py-1  font-mono text-xl border-0 border-gray-500"
        onClick={handleClick}
      >
        {buttonName}
      </button>
    </div>
  );
};

export default NavButton;
