import { useState } from "react";

import NavBar from "./components/NavBar";
import Body from "./components/Body";

const App = () => {
  const [currentPage, setCurrentPage] = useState("Feed");

  const pageChangeHandler = (pageName) => {
    setCurrentPage(pageName);
  };

  return (
    <>
      <NavBar setPageHandler={pageChangeHandler} currentPage={currentPage} />
      <Body />
    </>
  );
};

export default App;
