import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const ProductDetail = (props) => {
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    let isMountered = true;

    const category_slug = props.match.params.category;
    const product_slug = props.match.params.product;

    axios
      .get(`/api/viewproductdetail/${category_slug}/${product_slug}`)
      .then((res) => {
        if (isMountered) {
          if (res.data.status === 200) {
            setProduct(res.data.product);
            console.log(res.data.product2);
            setLoading(false);
          } else if (res.data.status === 404) {
            history.push("/collection");
            swal("Warning 404", res.data.message, "warning");
          }
        }
      });

    return () => {
      isMountered = false;
    };
  }, [history, props.match.params.product, props.match.params.category]);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevCount) => prevCount - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < product.quantity) {
      setQuantity((prevCount) => prevCount + 1);
    }
  };

  const submitAddtoCart = (e) => {
    e.preventDefault();

    const data = {
      product_id: product.id,
      product_qty: quantity,
    };

    axios.post(`/api/add-to-cart`, data).then((res) => {
      if (res.data.status === 201) {
        swal("Succcess", res.data.message, "success");
      } else if (res.data.status === 409) {
        swal("Succcess", res.data.message, "success");
      } else if (res.data.status === 401) {
        swal("Error", res.data.message, "error");
      } else if (res.data.status === 404) {
        swal("Warning", res.data.message, "warning");
      }
    });
  };

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
    var avail_stock = "";
    if (product.quantity > 0) {
      avail_stock = (
        <div>
          <label className="btn-sm btn-success px-4 mt-2">In Stock</label>

          <div className="row">
            <div className="col-md-3 mt-3">
              <div className="input-group">
                <button
                  type="button"
                  onClick={handleDecrement}
                  className="input-group-text"
                >
                  -
                </button>
                <div className="form-control text-center">{quantity}</div>
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="input-group-text"
                >
                  +
                </button>
              </div>
            </div>
            <div className="col-md-3 mt-3">
              <button
                type="button"
                onClick={submitAddtoCart}
                className="btn btn-primary w-100"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      avail_stock = (
        <div>
          <label className="btn-sm btn-danger px-4 mt-2">Out of Stock</label>
        </div>
      );
    }
  }

  return (
    <div className="container" style={{ height: "80vh" }}>
      <h1>
        Collection | {product.category.name} | {product.name}
      </h1>
      <div className="row">
        <div className="col-md-4 border-end">
          <img
            src={`https://frozen-plains-70593.herokuapp.com/${product.image}`}
            alt={product.name}
            className="w-100"
          />
        </div>
        <div className="col-md-8">
          <h4>
            {product.name}
            <span className="float-end badge btn-sm btn-danger badge-pil">
              {product.brand}
            </span>
          </h4>
          <p>{product.description}</p>
          <h4 className="mb-1">
            Rs: {product.selling_price}
            <s className="ms-2">Rs:{product.original_price}</s>
          </h4>
          <div>{avail_stock}</div>
          <button type="button" className="btn btn-danger mt-3">
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
