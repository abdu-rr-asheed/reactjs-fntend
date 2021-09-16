import React from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const Navbar = () => {
  const history = useHistory();

  const LogoutSubmit = (e) => {
    e.preventDefault();

    axios.post(`/api/logout`).then((res) => {
      if (res.data.status === 200) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        swal("Success", res.data.message, "success");
        history.push("/");
      }
    });
  };

  var AuthButton = "";
  if (!localStorage.getItem("auth_token")) {
    AuthButton = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </li>
      </ul>
    );
  } else {
    var AdDashbd = "";

    if (localStorage.getItem("auth_name") === "Administrator") {
      AdDashbd = (
        <li>
          <Link className="dropdown-item" to="/admin/dashboard">
            Dashboard
          </Link>
        </li>
      );
    } else {
      AdDashbd = "";
    }
    AuthButton = (
      <li className="nav-item dropdown">
        <div
          className="nav-link dropdown-toggle btn btn-sm btn-light text-dark"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {localStorage.getItem("auth_name")}
        </div>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          {AdDashbd}
          <li>
            <div className="dropdown-item" onClick={LogoutSubmit}>
              Logout
            </div>
          </li>
        </ul>
      </li>

      // <ul className="navbar-nav">
      //   <li className="nav-item">
      //     <button type="button" className="nav-link btn btn-sm text-white">
      //       {localStorage.getItem("auth_name")}
      //     </button>
      //   </li>
      //   <li className="nav-item">
      //     <button
      //       type="button"
      //       onClick={LogoutSubmit}
      //       className="nav-link btn btn-danger btn-sm text-white"
      //     >
      //       Logout
      //     </button>
      //   </li>
      // </ul>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">
        <Link className="navbar-brand" to="#">
          E-Commerce
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/collection">
                Collection
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/cart">
                Cart
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact us
              </NavLink>
            </li>
            {AuthButton}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
