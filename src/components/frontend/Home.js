import React from "react";
import Slider from "../../layouts/frontend/Slider";
import Laptop from "./Laptop";
import Mobile from "./Mobile";

const Home = () => {
  document.title = "E-Commerce";
  return (
    <div>
      <div className="container-fluid m-0 p-0">
        <Slider />
        <Mobile />
        <Laptop />
      </div>
    </div>
  );
};

export default Home;
