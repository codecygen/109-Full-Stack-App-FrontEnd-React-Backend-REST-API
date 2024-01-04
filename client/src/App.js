import { Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import EventsPage from "./pages/root/EventsPage";
import EventDetailsPage from "./pages/details/:title:details/EventDetailsPage";

import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";

import NotFoundPage from "./pages/404/404";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<EventsPage />} />
        <Route path="/details/:title/:id" element={<EventDetailsPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
