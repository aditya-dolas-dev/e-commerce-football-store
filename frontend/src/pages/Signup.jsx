import React from "react";
import ImageComponent from "../components/ImageComponent";
import InputComponent from "../components/InputComponent";
import imageUrl from "../assets/ruicosta.png"; // Update with the actual image path

const Signup = () => {
  return (
    <div className="bg-purple-800 font-mono">
      <div className="flex flex-col md:flex-row w-full h-screen border-[6px] border-purple-800 overflow-hidden rounded-2xl ">
        <section className="w-full md:w-1/2  h-[300px] md:h-full rounded-md">
          <ImageComponent url={imageUrl} size={"w-full h-full object-cover"} />
        </section>
        <section className="w-full md:w-1/2 bg-white h-full flex items-center justify-center ">
          <form className="flex flex-col gap-6 p-6 w-full max-w-[500px] rounded-lg">
            <h2 className="text-[23px] font-mono text-center mb-4 mt-4">
              Create an account
            </h2>

            {/* First Name */}
            <div className="flex flex-col text-left">
              <label
                htmlFor="firstname"
                className="mb-1 font-medium text-gray-400"
              >
                First Name
              </label>
              <InputComponent
                type="text"
                id="firstname"
                name="firstname"
                placeholder="Enter your first name"
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col text-left">
              <label
                htmlFor="lastname"
                className="mb-1 font-medium text-gray-400"
              >
                Last Name
              </label>
              <InputComponent
                type="text"
                id="lastname"
                name="lastname"
                placeholder="Enter your last name"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col text-left">
              <label htmlFor="email" className="mb-1 font-medium text-gray-400">
                Email Address
              </label>
              <InputComponent
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col text-left">
              <label
                htmlFor="password"
                className="mb-1 font-medium text-gray-400"
              >
                Password
              </label>
              <InputComponent
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-purple-700 rounded-4xl text-white py-2 px-4 mt-4  hover:bg-gray-800 transition"
            >
              Sign Up
            </button>
            {/* Login Link */}
            <p className="text-center text-sm text-gray-600 mt-2">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:underline ">
                Login
              </a>
            </p>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Signup;
