import React from "react";
import imgone from "../../assets/frontend/images/1.png";
import imgtwo from "../../assets/frontend/images/2.jpg";
import imgthree from "../../assets/frontend/images/3.jpg";

const Slider = () => {
  return (
    <div
      id="carouselExampleControls"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={imgone} className="d-block w-100" alt="one" />
        </div>
        <div className="carousel-item">
          <img src={imgtwo} className="d-block w-100" alt="two" />
        </div>
        <div className="carousel-item">
          <img src={imgthree} className="d-block w-100" alt="three" />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Slider;
