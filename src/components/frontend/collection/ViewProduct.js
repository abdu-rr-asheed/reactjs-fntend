import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const ViewProduct = (props) => {
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);

  const productCount = product.length;

  useEffect(() => {
    let isMountered = true;

    const product_slug = props.match.params.slug;

    axios.get(`/api/fetchproduct/${product_slug}`).then((res) => {
      if (isMountered) {
        if (res.data.status === 200) {
          setProduct(res.data.product_data.product);
          setCategory(res.data.product_data.category);
          setLoading(false);
        } else if (res.data.status === 400) {
          swal("Warning 400", res.data.message, "warning");
        } else if (res.data.status === 404) {
          history.push("/collection");
          swal("Warning 404", res.data.message, "warning");
        }
      }
    });

    return () => {
      isMountered = false;
    };
  }, [history, props.match.params.slug]);

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
    var ShowProductList_HTMLTABLE = "";

    if (productCount) {
      ShowProductList_HTMLTABLE = product.map((item) => {
        return (
          <div className="col-md-3" key={item.id}>
            <div className="card">
              <h5 className="text-center mt-1">{category.name}</h5>
              <Link
                to={`/collection/${item.category.slug}/${item.slug}`}
                className="text-decoration-none"
              >
                <img
                  src={`http://192.168.43.54:8000/${item.image}`}
                  className="w-100"
                  width="150"
                  alt={item.name}
                />
              </Link>
              <div className="card-body">
                <Link
                  to={`/collection/${item.category.slug}/${item.slug}`}
                  className="text-decoration-none text-center"
                >
                  <h5>{item.name}</h5>
                </Link>
              </div>
            </div>
          </div>
        );
      });
    } else {
      ShowProductList_HTMLTABLE = (
        <div className="col-md-12" style={{ height: "80vh" }}>
          <h6
            className="text-center d-flex justify-content-center align-items-center"
            style={{ height: "80vh" }}
          >
            No Product Available for {category.name}
          </h6>
        </div>
      );
    }
  }

  return (
    <div className="container" style={{ height: "80vh" }}>
      <h1>Collection | {category.name}</h1>
      <div className="row" style={{ height: "80vh" }}>
        {ShowProductList_HTMLTABLE}
      </div>
    </div>
  );
};

export default ViewProduct;
