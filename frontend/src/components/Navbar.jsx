import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, Search } from "lucide-react";
import { authStore } from "../store/authStore";
import { contentStore } from "../store/contentStore";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout, user } = authStore();
  const { setContentType, contentType } = contentStore();

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="max-w-6xl mx-auto p-6 flex justify-between items-center bg-transparent text-white relative z-10">
      <div className="gap-4 items-center   flex">
        <Link to={"/"}>
          <img src={"/netflix-logo.png"} alt="logo" className="w-32 sm:w-44" />
        </Link>

        {/* DESKTOP NAVBAR ITEMS */}
        <div className=" gap-2 hidden sm:flex">
          <Link
            to={"/"}
            className="underline"
            onClick={() => setContentType("movie")}
          >
            Movies
          </Link>
          <Link
            to={"/"}
            className="underline"
            onClick={() => setContentType("tv")}
          >
            Tv Shows
          </Link>
          <Link to={"/"} className="underline">
            Search History
          </Link>
        </div>
      </div>

      <div className="flex gap-2 justify-center items-center">
        <Link to={"/search"}>
          <Search />
        </Link>
        <img src="/avatar2.png" alt="avatar" className="w-8" />
        <Link to={"/"}>
          <LogOut onClick={logout} />
        </Link>
        <div className="sm:hidden">
          <Menu className="cursor-pointer" onClick={toggleMenu} />
        </div>
      </div>

      {/* MOBILE NAVBAR ITEMS */}
      {isMobileMenuOpen && (
        <div className=" mt-48 p-2 rounded border bg-black z-50 border-gray-500 absolute right-4">
          <Link
            to={"/"}
            className="block hover:underline p-2"
            onClick={() => {
              setContentType("movie");
              toggleMenu();
            }}
          >
            Movies
          </Link>
          <Link
            to={"/"}
            className="block hover:underline p-2"
            onClick={() => {
              setContentType("tv");
              toggleMenu();
            }}
          >
            Tv Shows
          </Link>
          <Link
            to={"/history"}
            className="block hover:underline p-2"
            onClick={toggleMenu}
          >
            Search History
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
