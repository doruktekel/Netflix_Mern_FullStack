import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/register?email=${email}`);
  };

  return (
    <div className="hero-bg w-full ">
      {/* HEADER */}
      <header className="max-w-6xl mx-auto p-6 flex justify-between items-center">
        <Link to={"/"}>
          <img src={"/netflix-logo.png"} alt="logo" className="w-32 sm:w-44" />
        </Link>
        <Link
          to={"/login"}
          className="text-white bg-red-600 border border-red-600 py-1 px-2 rounded hover:bg-transparent transition-all duration-300 font-semibold "
        >
          Log in
        </Link>
      </header>

      {/* HERO SECTION  */}

      <div className="   max-w-6xl mx-auto  text-white text-center py-32 px-5 flex flex-col gap-2 ">
        {" "}
        <p className="text-6xl font-extrabold">
          Unlimited movies, Tv shows, and more
        </p>
        <p className="text-sm">Watch anywhere cancel anytime</p>
        <p className="text-sm">
          Ready to watch? Enter your email to create or restart your membership{" "}
        </p>
        <form
          onSubmit={handleSubmit}
          className=" flex flex-col md:flex-row  gap-4 justify-center items-center"
        >
          <input
            type="email"
            placeholder="@gmail.com"
            className="bg-gray-900 p-2 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="text-white bg-red-600 border border-red-600 py-1 px-2 rounded justify-center items-center flex gap-2  "
          >
            Get Started
            <ChevronRight />
          </button>
        </form>
      </div>

      {/* SEPERATOR  */}
      <div className="h-1 w-full bg-gray-700  aria-hidden:true"></div>

      {/* 1ST SECTION */}
      <div className="w-full bg-black text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-center items-center text-center gap-10  p-10">
          {/* LEFT SIDE */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Enjoy on your TV
            </h2>
            <p className="text-lg md:text-xl">
              Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
              Blu-ray players, and more.
            </p>
          </div>
          {/* RIGHT SIDE  */}
          <div className="flex-1 relative">
            <img src="/tv.png" alt="tv" className="z-20 relative" />
            <video
              src="/hero-vid.m4v"
              muted
              loop
              autoPlay={true}
              className="absolute -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2  h-1/2 z-10  "
            />
          </div>
        </div>
      </div>

      {/* SEPERATOR  */}
      <div className="h-1 w-full bg-gray-700  aria-hidden:true"></div>

      {/* 2ND SECTION */}

      <div className="w-full bg-black text-white">
        <div className="max-w-6xl mx-auto md:flex-row flex flex-col-reverse justify-center items-center text-center md:gap-10 gap-0 bg-black text-white p-10">
          {/* LEFT SIDE */}
          <div className="flex-1">
            <div className="relative justify-center items-center">
              <img src="/stranger-things-lg.png" alt="phone" />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 border border-gray-200 flex gap-1 justify-between    items-center bg-black p-1 ">
                <img
                  src="/stranger-things-sm.png"
                  alt="stranger-things"
                  className=" sm:w-1/4 w-1/6"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-xs">Stranger Things</p>
                  <p className="text-xs text-blue-900">Downloading...</p>
                </div>

                <img
                  src="/download-icon.gif"
                  alt="download"
                  className="sm:h-10 sm:w-10 h-6 w-6"
                />
              </div>
            </div>
          </div>
          {/* RIGHT SIDE  */}
          <div className="flex-1 ">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
              Download your shows to watch offline
            </h2>
            <p className="text-lg md:text-xl">
              Save your favorites easily and always have something to watch.
            </p>
          </div>
        </div>
      </div>

      {/* SEPERATOR  */}
      <div className="h-1 w-full bg-gray-700  aria-hidden:true"></div>

      {/* 3RD SECTION */}
      <div className="w-full bg-black text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-center items-center text-center gap-10 bg-black text-white p-10">
          {/* LEFT SIDE */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Watch Everywhere
            </h2>
            <p className="text-lg md:text-xl">
              Stream unlimited movies and TV shows on your phone, tablet,
              laptop, and TV.
            </p>
          </div>
          {/* RIGHT SIDE  */}
          <div className="flex-1 relative">
            <img src="/device-pile.png" alt="tv" className="z-20 relative" />
            <video
              src="/video-devices.m4v"
              muted
              loop
              autoPlay={true}
              className="absolute -translate-y-1/2 top-1/3 -translate-x-1/2 left-1/2 h-1/2 z-10 w-3/5  "
            />
          </div>
        </div>
      </div>

      {/* SEPERATOR  */}
      <div className="h-1 w-full bg-gray-700  aria-hidden:true"></div>

      {/* 4RD SECTION */}
      <div className="w-full bg-black text-white">
        <div className="max-w-6xl mx-auto md:flex-row flex flex-col-reverse justify-center items-center text-center md:gap-10 gap-0 bg-black text-white p-10">
          {/* LEFT SIDE */}
          <div className="flex-1">
            <img src="/kids.png" alt="download" />
          </div>
          {/* RIGHT SIDE  */}
          <div className="flex-1 ">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
              Create profiles for kids
            </h2>
            <p className="text-lg md:text-xl">
              Send kids on adventures with their favorite characters in a space
              made just for them—free with your membership.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
