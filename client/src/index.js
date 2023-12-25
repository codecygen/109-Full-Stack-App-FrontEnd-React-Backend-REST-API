import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import { MobileMenuContextProvider } from "./store/mobile-menu-context";

import "./index.scss";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MobileMenuContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MobileMenuContextProvider>
  </React.StrictMode>
);
