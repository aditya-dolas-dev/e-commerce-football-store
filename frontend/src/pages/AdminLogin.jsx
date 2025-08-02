import React from "react";
import ImageComponent from "../components/ImageComponent";
import imageUrl from "../assets/vanbasten.jpg";
import InputComponent from "../components/InputComponent";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      "http://localhost:3000/api/v1/admin/login",
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
    <div className="bg-gray-800 font-mono">
      <div className="flex flex-col md:flex-row w-full h-screen border-[6px] border-gray-800 overflow-hidden rounded-2xl ">
        <section className="w-full md:w-1/2  h-[300px] md:h-full rounded-md">
          <ImageComponent
            url={imageUrl}
            size={"w-full h-full  object-cover object-top"}
          />
        </section>
        <section className="w-full md:w-1/2 bg-white h-full flex items-center justify-center ">
          <form className="flex flex-col gap-6 p-6 w-full max-w-[500px] rounded-lg">
            <h2 className="text-[23px] font-mono text-center mb-4 mt-4">
              Login to your Business account
            </h2>

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
              className="bg-gray-700 rounded-4xl text-white py-2 px-4 mt-4  hover:bg-pink-500 transition"
            >
              Login
            </button>
            {/* Login Link */}
            <p className="text-center text-sm text-gray-600 mt-2">
              i don't have an account?{" "}
              <a href="/adminsignup" className="text-blue-600 hover:underline ">
                create an account
              </a>
            </p>
          </form>
        </section>
      </div>
    </div>
  );
};
export default AdminLogin;
