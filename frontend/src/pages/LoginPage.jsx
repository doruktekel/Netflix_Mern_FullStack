import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authStore } from "../store/authStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = authStore();

  const handleLogin = (e) => {
    e.preventDefault();

    login({ email, password });
  };
  return (
    <div className="hero-bg h-screen w-full ">
      <header className="max-w-6xl mx-auto py-6">
        <Link to={"/"}>
          <img src={"/netflix-logo.png"} alt="logo" className="w-44" />
        </Link>
      </header>
      <div className="w-full flex justify-center items-center mt-32">
        <div className="max-w-xl mx-auto px-10 py-5 flex flex-col gap-2 bg-black bg-opacity-60 rounded-lg shadow-md ">
          <h1 className="text-xl text-gray-100 font-bold self-center">
            Register
          </h1>
          <form className="flex flex-col space-y-5 " onSubmit={handleLogin}>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className=" text-gray-300 text-sm">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full text-sm bg-transparent border border-gray-600 text-gray-200 p-1 rounded-md focus:outline-none focus:ring"
                placeholder="doruk@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className=" text-gray-300 text-sm">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="w-full text-sm bg-transparent border border-gray-600 text-gray-200 p-1 rounded-md focus:outline-none focus:ring"
                placeholder="*******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-red-700 text-gray-100 text-sm p-1 "
            >
              Log In
            </button>
          </form>
          <div>
            <p className="text-xs text-gray-600 text-center">
              Dont have an account ?{" "}
              <Link
                to={"/register"}
                className=" text-red-700 text-xs underline"
              >
                {" "}
                Register
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
