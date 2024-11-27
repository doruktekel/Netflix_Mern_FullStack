import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/home/HomePage";
import WatchPage from "./pages/WatchPage";
import Footer from "./components/Footer";
import { authStore } from "./store/authStore";
import { Loader } from "lucide-react";
import ScrollTop from "./components/ScrollTop";
import SearchPage from "./pages/SearchPage";
import SearchHistoryPage from "./pages/SearchHistoryPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  const { authCheck, user, isChecking } = authStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isChecking) {
    return (
      <div className="h-screen">
        <div className=" flex justify-center items-center h-full bg-black">
          <Loader className="animate-spin text-red-600 size-10" />
        </div>
      </div>
    );
  }
  return (
    <div>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/register"
          element={!user ? <RegisterPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to={"/"} />}
        />

        <Route
          path={"/watch/:id"}
          element={user ? <WatchPage /> : <LoginPage />}
        />

        <Route path="/search" element={user ? <SearchPage /> : <LoginPage />} />

        <Route
          path="/search-history"
          element={user ? <SearchHistoryPage /> : <LoginPage />}
        />

        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <Toaster />
    </div>
  );
};

export default App;
