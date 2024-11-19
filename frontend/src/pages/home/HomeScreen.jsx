import React from "react";
import { authStore } from "../../store/authStore";

const HomeScreen = () => {
  const { logout } = authStore();
  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default HomeScreen;
