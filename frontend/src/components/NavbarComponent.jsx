import React from "react";
import NavButton from "../features/NavButton";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NavbarComponent = () => {
  const navigate = useNavigate();
  return (
    <nav className="w-full flex justify-between  bg-[#F2F2F2] gap-2  items-center px-6 py-2  h-[45px] ">
      {/* Logo */}
      <div className="flex flex-row">
        {" "}
        <div className="flex items-center mt-[9px]">
          <span className="text-xl font-tavirs text-black">Elastico</span>
        </div>
        {/* Nav Buttons */}
        <div className="space-x-4  mt-[9px] flex justify-start items-center  px-6 py-0.5">
          <button
            className="text-black "
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </button>
          <button
            className="text-black "
            onClick={() => {
              navigate("/shop");
            }}
          >
            Shop
          </button>
          <button
            className="text-black "
            onClick={() => {
              navigate("/Threads");
            }}
          >
            Threads
          </button>
          <button className="text-black ">Categories</button>
        </div>
      </div>

      <div className="space-x-5 mt-[9px] flex    px-3 py-0.5">
        <NavButton buttonName="cart" color={"bg-[#FFFFFF]"} />
        <NavButton buttonName="Login" color={"bg-[#FF9E03]"} />
        <NavButton buttonName="Signup" color={"bg-[#FF9E03]"} />
      </div>
    </nav>
  );
};

export default NavbarComponent;
