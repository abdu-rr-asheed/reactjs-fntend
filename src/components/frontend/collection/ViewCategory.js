import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ViewCategory = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMountered = true;

    axios.get(`/api/getCategory`).then((res) => {
      if (isMountered) {
        if (res.data.status === 200) {
          setCategory(res.data.category);
          setLoading(false);
        }
      }
      return () => {
        isMountered = false;
      };
    });
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else {
    var ShowCategoryList_HTMLTABLE = "";
    ShowCategoryList_HTMLTABLE = category.map((item) => {
      return (
        <div className="col-md-3" key={item.id}>
          <div className="card">
            <div className="card-body">
              <Link
                to={`collection/${item.slug}`}
                className="text-decoration-none text-center"
              >
                <h5>{item.name}</h5>
              </Link>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="container">
      <h1>All Category</h1>
      <div className="row">{ShowCategoryList_HTMLTABLE}</div>
    </div>
  );
};

export default ViewCategory;
