import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const EditProduct = (props) => {
  const history = useHistory();
  const [categorylist, setCategorylist] = useState([]);
  const [productInput, setProduct] = useState({
    category_id: "",
    slug: "",
    name: "",
    description: "",

    meta_title: "",
    meta_keyword: "",
    meta_description: "",

    selling_price: "",
    original_price: "",
    quantity: "",
    brand: "",
  });

  const [picture, setPicture] = useState([]);
  const [errorlist, setError] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleInput = (e) => {
    e.persist();

    setProduct({ ...productInput, [e.target.name]: e.target.value });
  };
  const handleImage = (e) => {
    setPicture({ image: e.target.files[0] });
  };

  const [allcheckbox, setcheckboxs] = useState([]);

  const handleCheckbox = (e) => {
    e.persist();

    setcheckboxs({ ...allcheckbox, [e.target.name]: e.target.checked });
  };

  useEffect(() => {
    document.title = "Add Product - Admin";

    axios.get(`/api/all-category`).then((res) => {
      if (res.data.status === 200) {
        setCategorylist(res.data.category);
      }
    });

    const product_id = props.match.params.id;

    axios.get(`/api/edit-product/${product_id}`).then((res) => {
      if (res.data.status === 200) {
        setProduct(res.data.product);
        setcheckboxs(res.data.product);
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        history.push("/admin/View-product");
      }
      setLoading(false);
    });
  }, [props.match.params.id, history]);

  const updateProduct = (e) => {
    e.preventDefault();

    const product_id = props.match.params.id;

    const formData = new FormData();
    formData.append("image", picture.image);
    formData.append("category_id", productInput.category_id);
    formData.append("slug", productInput.slug);
    formData.append("name", productInput.name);
    formData.append("description", productInput.description);

    formData.append("meta_title", productInput.meta_title);
    formData.append("meta_keyword", productInput.meta_keyword);
    formData.append("meta_description", productInput.meta_description);

    formData.append("selling_price", productInput.selling_price);
    formData.append("original_price", productInput.original_price);
    formData.append("quantity", productInput.quantity);
    formData.append("brand", productInput.brand);
    formData.append("featured", allcheckbox.featured ? "1" : "0");
    formData.append("popular", allcheckbox.popular ? "1" : "0");
    formData.append("status", allcheckbox.status ? "1" : "0");

    axios.post(`/api/update-product/${product_id}`, formData).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setError([]);
      } else if (res.data.status === 422) {
        swal("All Fields are mandetory", "", "warning");
        setError(res.data.errors);
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
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
  }

  return (
    <div className="container px-4">
      <div className="card mt-4">
        <div className="card-header">
          <h4>
            Edit Product
            <Link
              to="/admin/View-product"
              className="btn btn-primary btn-sm float-end"
            >
              Back
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <form onSubmit={updateProduct} encType="multipart/form-data">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home"
                  type="button"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  Home
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="seotags-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#seotags"
                  type="button"
                  role="tab"
                  aria-controls="seotags"
                  aria-selected="false"
                >
                  Seo Tags
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="otherdetails-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#otherdetails"
                  type="button"
                  role="tab"
                  aria-controls="otherdetails"
                  aria-selected="false"
                >
                  Other Details
                </button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane card-body border fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div className="form-group mb-3">
                  <label>Select Category</label>
                  <select
                    type="text"
                    name="category_id"
                    onChange={handleInput}
                    value={productInput.category_id}
                    className="form-control"
                  >
                    <option>Select Category</option>
                    {categorylist.map((item) => {
                      return (
                        <option value={item.id} key={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                  <span className="text-danger">{errorlist.category_id}</span>
                </div>
                <div className="form-group mb-3">
                  <label>Slug</label>
                  <input
                    type="text"
                    name="slug"
                    onChange={handleInput}
                    value={productInput.slug}
                    className="form-control"
                  />
                  <span className="text-danger">{errorlist.slug}</span>
                </div>
                <div className="form-group mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleInput}
                    value={productInput.name}
                    className="form-control"
                  />
                  <span className="text-danger">{errorlist.name}</span>
                </div>
                <div className="form-group mb-3">
                  <label>Description</label>
                  <textarea
                    name="description"
                    onChange={handleInput}
                    value={productInput.description}
                    className="form-control"
                  ></textarea>
                  {/* <span className="text-danger">
                  {categoryInput.error_list.slug}
                </span> */}
                </div>
              </div>
              <div
                className="tab-pane card-body border fade"
                id="seotags"
                role="tabpanel"
                aria-labelledby="seotags-tab"
              >
                <div className="form-group mb-3">
                  <label>Meta Title</label>
                  <input
                    type="text"
                    name="meta_title"
                    onChange={handleInput}
                    value={productInput.meta_title}
                    className="form-control"
                  />
                  <span className="text-danger">{errorlist.meta_title}</span>
                </div>
                <div className="form-group mb-3">
                  <label>Meta Keyword</label>
                  <textarea
                    name="meta_keyword"
                    onChange={handleInput}
                    value={productInput.meta_keyword}
                    className="form-control"
                  ></textarea>
                  {/* <span className="text-danger">
                  {categoryInput.error_list.slug}
                </span> */}
                </div>
                <div className="form-group mb-3">
                  <label>Meta Description</label>
                  <textarea
                    name="meta_description"
                    onChange={handleInput}
                    value={productInput.meta_description}
                    className="form-control"
                  ></textarea>
                  {/* <span className="text-danger">
                  {categoryInput.error_list.slug}
                </span> */}
                </div>
              </div>
              <div
                className="tab-pane card-body border fade"
                id="otherdetails"
                role="tabpanel"
                aria-labelledby="otherdetails-tab"
              >
                <div className="row">
                  <div className="col-md-4 form-group md-3">
                    <label>Selling Price</label>
                    <input
                      type="text"
                      name="selling_price"
                      onChange={handleInput}
                      value={productInput.selling_price}
                      className="form-control"
                    />
                    <span className="text-danger">
                      {errorlist.selling_price}
                    </span>
                  </div>
                  <div className="col-md-4 form-group md-3">
                    <label>Original Price</label>
                    <input
                      type="text"
                      name="original_price"
                      onChange={handleInput}
                      value={productInput.original_price}
                      className="form-control"
                    />
                    <span className="text-danger">
                      {errorlist.original_price}
                    </span>
                  </div>
                  <div className="col-md-4 form-group md-3">
                    <label>Quantity</label>
                    <input
                      type="text"
                      name="quantity"
                      onChange={handleInput}
                      value={productInput.quantity}
                      className="form-control"
                    />
                    <span className="text-danger">{errorlist.quantity}</span>
                  </div>
                  <div className="col-md-4 form-group md-3">
                    <label>Brand</label>
                    <input
                      type="text"
                      name="brand"
                      onChange={handleInput}
                      value={productInput.brand}
                      className="form-control"
                    />
                    <span className="text-danger">{errorlist.brand}</span>
                  </div>
                  <div className="col-md-4 form-group md-3">
                    <label>Image</label>
                    <input
                      type="file"
                      name="image"
                      onChange={handleImage}
                      className="form-control"
                    />

                    <span className="text-danger">{errorlist.image}</span>
                  </div>
                  <div className="col-md-4 form-group md-3">
                    <img
                      src={`http://localhost:8000/${productInput.image}`}
                      alt={productInput.name}
                      loading="lazy"
                      width="150"
                    />
                  </div>
                  <div className="col-md-4 form-group md-3">
                    <div className="form-check form-switch mt-4">
                      <input
                        type="checkbox"
                        name="featured"
                        onChange={handleCheckbox}
                        defaultChecked={
                          allcheckbox.featured === 1 ? true : false
                        }
                        className="form-check-input"
                        id="featured"
                      />
                      <label className="form-check-label" id="featured">
                        Featured (checked=shown)
                      </label>
                    </div>
                  </div>
                  <div className="col-md-4 form-group md-3">
                    <div className="form-check form-switch mt-4">
                      <input
                        type="checkbox"
                        name="popular"
                        onChange={handleCheckbox}
                        defaultChecked={
                          allcheckbox.popular === 1 ? true : false
                        }
                        className="form-check-input"
                        id="popular"
                      />
                      <label className="form-check-label" id="popular">
                        Popular (checked=shown)
                      </label>
                    </div>
                  </div>
                  <div className="col-md-4 form-group md-3">
                    <div className="form-check form-switch mt-4">
                      <input
                        type="checkbox"
                        name="status"
                        onChange={handleCheckbox}
                        defaultChecked={allcheckbox.status === 1 ? true : false}
                        className="form-check-input"
                        id="status"
                      />
                      <label className="form-check-label" id="Status">
                        Status (checked=shown)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary mt-2 float-end">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
