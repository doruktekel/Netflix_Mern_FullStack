import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Undo2 } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen relative  ">
      <div className="max-w-7xl mx-auto text-white p-10 ">
        <Navbar />
        <div className="flex flex-col items-center gap-10 mt-10  ">
          <p className="text-xl lg:text-3xl font-bold"> Page is not found !</p>
          <Link
            to={"/"}
            className="flex gap-2 bg-red-700  px-4 py-2 rounded-lg  border-red-700 border-2 hover:bg-transparent transition-all duration-200 ease-in-out  "
          >
            <p> Home Page </p>
            <Undo2 color="white" />
          </Link>
        </div>
      </div>
      <img
        src={"/404.png"}
        alt="NotFoundPage"
        className="absolute left-0 top-0  w-full -z-10 "
      />
    </div>
  );
};

export default NotFoundPage;
