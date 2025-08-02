import React from "react";
import ImageComponent from "../components/ImageComponent";
import InputComponent from "../components/InputComponent";
import imageUrl from "../assets/baggio.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const AdminSignup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      "http://localhost:3000/api/v1/admin/signup",
      {
        firstname,
        lastname,
        email,
        password,
      }
    );

    localStorage.setItem("token", response.data.token);
    navigate("/");
  };

  return (
    <div className="bg-blue-800 font-mono">
      <div className="flex flex-col md:flex-row w-full h-screen border-[6px] border-blue-800 overflow-hidden rounded-2xl ">
        <section className="w-full md:w-1/2  h-[300px] md:h-full rounded-md">
          <ImageComponent url={imageUrl} size={"w-full h-full object-cover"} />
        </section>
        <section className="w-full md:w-1/2 bg-white h-full flex items-center justify-center ">
          <form
            className="flex flex-col gap-6 p-6 w-full max-w-[500px] rounded-lg"
            onSubmit={handleSubmit}
          >
            <h2 className="text-[23px] font-mono text-center mb-4 mt-4">
              Create an Business account
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
                setChangeValue={setFirstname}
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
                setChangeValue={setLastname}
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
                setChangeValue={setEmail}
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
                setChangeValue={setPassword}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-700 rounded-4xl text-white py-2 px-4 mt-4  hover:bg-gray-800 transition"
            >
              Sign Up
            </button>
            {/* Login Link */}
            <p className="text-center text-sm text-gray-600 mt-2">
              Already have an account?{" "}
              <a href="/adminlogin" className="text-blue-600 hover:underline ">
                Login
              </a>
            </p>
          </form>
        </section>
      </div>
    </div>
  );
};

export default AdminSignup;
