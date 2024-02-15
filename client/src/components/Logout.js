import React from "react";

import useAuth from "../hooks/use-auth";

const Logout = () => {
  const { name } = useAuth();

  return (
    <>
      <div>{name}</div>
      <div>Logout</div>
    </>
  );
};

export default Logout;
