import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Main from "./pages/Main";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} exact />
        <Route path="/main" element={<Main />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;