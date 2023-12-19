import { useState } from "react";

import { Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";

import FeedPage from "./pages/FeedPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

const App = () => {
  const [currentPage, setCurrentPage] = useState("Feed");

  const pageChangeHandler = (pageName) => {
    setCurrentPage(pageName);
  };

  return (
    <>
      <NavBar setPageHandler={pageChangeHandler} currentPage={currentPage} />
      <Routes>
        <Route path="/" element={<FeedPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </>
  );
};

export default App;
