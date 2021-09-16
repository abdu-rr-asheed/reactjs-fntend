import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  document.title = "Admin - Dashboard";
  return (
    <>
      <h1>Im Dashboard</h1>
      <div className="d-flex flex-wrap">
        <Link className="btn btn-primary ms-2" to="/admin/dashboard">
          Dashboard
        </Link>
        <Link className="btn btn-secondary ms-2" to="/admin/add-category">
          Add-Category
        </Link>
        <Link className="btn btn-success ms-2" to="/admin/view-category">
          view-Category
        </Link>
        <Link className="btn btn-danger ms-2" to="/admin/add-product">
          Add-Product
        </Link>
        <Link className="btn btn-warning ms-2" to="/admin/view-product">
          View-Product
        </Link>
        <Link className="btn btn-info ms-2" to="/admin/profile">
          Profile
        </Link>
      </div>
    </>
  );
};

export default Dashboard;
