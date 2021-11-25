import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductCategory = (props) => {
  const [loading, setLoading] = useState(true);
  const [mobile, setMobile] = useState([]);
  const [mcategory, setMcategory] = useState([]);

  useEffect(() => {
    axios.get(`/api/fetchproduct/${props.slug}`).then((res) => {
      if (res.data.status === 200) {
        setMobile(res.data.product_data.product);
        setMcategory(res.data.product_data.category);
        setLoading(false);
      }
    });
  }, [props.slug]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100%" }}
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else {
    var mobile_HTML = "";
    mobile_HTML = mobile.map((item, idx) => {
      return (
        <div className="card my-2 me-4" style={{ width: "15rem" }} key={idx}>
          <img
            // src={`http://192.168.43.54:8000/${item.image}`}
            src={`https://frozen-plains-70593.herokuapp.com/${item.image}`}
            loading="lazy"
            className="card-img-top"
            alt={item.name}
          />

          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <p
              className="card-text"
              style={{ height: "50px", overflow: "hidden" }}
            >
              {item.description}
            </p>
            <Link to="/" className="btn btn-primary">
              {item.brand}
            </Link>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="container my-4">
      <nav className="navbar navbar-dark bg-dark">
        <Link className="navbar-brand mx-4" to="/">
          <i className="fas fa-mobile-alt"></i>
          &nbsp; {mcategory.name}
        </Link>
      </nav>
      <div className="d-flex justify-content-sm-start justify-content-center align-items-center flex-wrap">
        {mobile_HTML}
      </div>
    </div>
  );
};

export default ProductCategory;
