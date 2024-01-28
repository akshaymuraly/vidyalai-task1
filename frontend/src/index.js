import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./Screen/App.jsx";
import UserFormPage from "./Screen/UserScreens/UserFormPage.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserFormPage />
  </React.StrictMode>
);
