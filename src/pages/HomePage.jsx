import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <React.Fragment>
      <h1>Home Page</h1>
      <Link to={"/login"}>Login</Link>
      <br />
      <br />
      <Link to={"/"}>Home</Link>
    </React.Fragment>
  );
};

export default HomePage;
