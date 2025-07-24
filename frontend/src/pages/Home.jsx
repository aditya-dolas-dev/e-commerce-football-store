import React from "react";
import NavbarComponent from "../components/NavbarComponent";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-wrap content-start bg-black">
      {/* Navigation Bar */}
      <NavbarComponent />

      {/* Page Content */}
      <div className="grow w-full h-[90%] bg-black">
        <h1 className="text-[26px] font-serif text-white text-center mt-28">
          A jersey is more than fabric — it weaves us together
          <br /> turning ordinary fans into a tapestry of hope and pride, united
          as one extraordinary force
        </h1>
      </div>
    </div>
  );
};

export default Home;
