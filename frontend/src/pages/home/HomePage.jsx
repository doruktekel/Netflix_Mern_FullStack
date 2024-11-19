import React from "react";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";
import { authStore } from "../../store/authStore";

const HomePage = () => {
  const { user } = authStore();

  return <> {user ? <HomeScreen /> : <AuthScreen />}</>;
};

export default HomePage;
