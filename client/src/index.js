import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";

import { MobileMenuContextProvider } from "./store/context-api/mobile-menu-context";

import store from "./store/redux/index";

import "./index.scss";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MobileMenuContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MobileMenuContextProvider>
    </Provider>
  </React.StrictMode>
);
