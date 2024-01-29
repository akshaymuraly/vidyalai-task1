import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import UserHomePage from "./Screen/UserScreens/UserHomePage.jsx";
import { Provider } from "react-redux";
import { store } from "./Store/Store.js";
import UserFormPage from "./Screen/UserScreens/UserFormPage.jsx";
import App from "./App.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <UserFormPage /> */}
      {/* <UserHomePage /> */}
      <App />
    </Provider>
  </React.StrictMode>
);
