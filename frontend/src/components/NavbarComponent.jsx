import React from "react";
import NavButton from "../features/NavButton";
import { ShoppingCart } from "lucide-react";

const NavbarComponent = () => {
  return (
    <nav className="w-full flex justify-start gap-2  items-center px-6 py-4 bg-transparent h-[4%]">
      {/* Logo */}
      <div className="flex items-center">
        <span className="text-xl text-tavirs text-white">Elastico</span>
      </div>

      {/* Nav Buttons */}
      <div className="space-x-4 ml-[400px] mt-[14px] flex justify-center items-center bg-gray-700 rounded-2xl px-3 py-0.5">
        <NavButton buttonName="Home" />
        <NavButton buttonName="Shop" />
        <NavButton buttonName="Threads" />
      </div>
      <div className="space-x-4 ml-[240px] mt-[14px] flex bg-gray-700 rounded-2xl px-3 py-0.5">
        <NavButton buttonName={<ShoppingCart />} />
        <NavButton buttonName="Login" />
        <NavButton buttonName="Signup" />
      </div>
    </nav>
  );
};

export default NavbarComponent;
