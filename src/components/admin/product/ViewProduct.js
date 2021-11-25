import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ViewProduct = () => {
  const [loading, setLoading] = useState(true);
  const [ViewProduct, setProduct] = useState([]);

  useEffect(() => {
    document.title = "View Product - Admin";

    axios.get(`/api/view-product`).then((res) => {
      if (res.data.status === 200) {
        setProduct(res.data.products);
      }
      setLoading(false);
    });
  }, []);

  var ViewProduct_HTMLTABLE = "";

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
    ViewProduct_HTMLTABLE = ViewProduct.map((item) => {
      return (
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <th>{item.category.name}</th>
          <th>{item.name}</th>
          <td>{item.selling_price}</td>
          <td>
            <img
              src={`https://frozen-plains-70593.herokuapp.com/${item.image}`}
              alt={item.name}
              width="100"
            />
          </td>
          <td>
            <Link
              to={`edit-product/${item.id}`}
              className="btn btn-success btn-sm"
            >
              Edit
            </Link>
          </td>
          <td>
            <button
              type="button"
              // onClick={(e) => deleteCategory(e, item.id)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }

  return (
    <div className="container px-4">
      <div className="card mt-4">
        <div className="card-header">
          <h4>
            View Product
            <Link
              to="/admin/Add-product"
              className="btn btn-primary btn-sm float-end"
            >
              Add Product
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-dark table-striped text-center align-middle rounded">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Category Name</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Selling Price</th>
                  <th scope="col">Image</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>{ViewProduct_HTMLTABLE}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
