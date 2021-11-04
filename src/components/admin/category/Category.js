import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";

const Category = () => {
  document.title = "Add Category - Admin";
  const [categoryInput, setCategory] = useState({
    meta_keywords: "",
    meta_description: "",
    meta_title: "",
    slug: "",
    name: "",
    description: "",
    status: "",
    error_list: [],
  });
  const [picture, setPicture] = useState([]);

  const handleinput = (e) => {
    e.persist();
    setCategory({ ...categoryInput, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setPicture({ image: e.target.files[0] });
  };

  const submitCategory = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", picture.image);
    formData.append("meta_title", categoryInput.meta_title);
    formData.append("meta_keywords", categoryInput.meta_keywords);
    formData.append("meta_description", categoryInput.meta_description);
    formData.append("slug", categoryInput.slug);
    formData.append("name", categoryInput.name);
    formData.append("description", categoryInput.description);
    formData.append("status", categoryInput.status);

    axios.post(`/api/store-category`, formData).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setCategory({
          ...categoryInput,
          meta_keywords: "",
          meta_description: "",
          meta_title: "",
          slug: "",
          name: "",
          description: "",
          status: "",
          error_list: [],
        });

        categoryInput.meta_title = "";
        categoryInput.meta_keywords = "";
        categoryInput.meta_description = "";
        categoryInput.slug = "";
        categoryInput.name = "";
        categoryInput.description = "";
        categoryInput.status = "";

        // document.getElementById("CATEGORY_FORM").reset();
        // setCategory({ ...categoryInput, error_list: [] });
      } else if (res.data.status === 400) {
        setCategory({ ...categoryInput, error_list: res.data.errors });
      }
    });
  };

  return (
    <div className="container-fluid px-4">
      <div className="card mt-4">
        <div className="card-header">
          <h4>
            Add Category
            <Link
              to="/admin/view-category"
              className="btn btn-primary btn-sm float-end"
            >
              View Category
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <form onSubmit={submitCategory} id="CATEGORY_FORM">
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
                  id="seo-tags-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#seo-tags"
                  type="button"
                  role="tab"
                  aria-controls="seo-tags"
                  aria-selected="false"
                >
                  SEO-Tags
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
                  <label>Slug</label>
                  <input
                    type="text"
                    name="slug"
                    onChange={handleinput}
                    value={categoryInput.slug}
                    className="form-control"
                  />
                  <span className="text-danger">
                    {categoryInput.error_list.slug}
                  </span>
                </div>

                <div className="form-group mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleinput}
                    value={categoryInput.name}
                    className="form-control"
                  />
                  <span className="text-danger">
                    {categoryInput.error_list.name}
                  </span>
                </div>

                <div className="row">
                  <div className="col-md-8 form-group mb-3">
                    <label>Description</label>
                    <textarea
                      name="description"
                      onChange={handleinput}
                      value={categoryInput.description}
                      className="form-control"
                    ></textarea>
                    <span className="text-danger">
                      {categoryInput.error_list.description}
                    </span>
                  </div>
                  <div className="col-md-4 form-group md-3">
                    <label>Image</label>
                    <input
                      type="file"
                      name="image"
                      onChange={handleImage}
                      className="form-control"
                    />
                    <span className="text-danger">
                      {categoryInput.error_list.image}
                    </span>
                  </div>
                </div>

                <div className="form-group mb-3">
                  <label>Status</label>
                  <input
                    type="checkbox"
                    name="status"
                    onChange={handleinput}
                    value={categoryInput.status}
                    className="form-check-input"
                  />
                  status 0=shown/1=hidden
                </div>
              </div>
              <div
                className="tab-pane card-body border fade"
                id="seo-tags"
                role="tabpanel"
                aria-labelledby="seo-tags-tab"
              >
                <div className="form-group mb-3">
                  <label>Meta Title</label>
                  <input
                    type="text"
                    name="meta_title"
                    onChange={handleinput}
                    value={categoryInput.meta_title}
                    className="form-control"
                  />
                  <span className="text-danger">
                    {categoryInput.error_list.meta_title}
                  </span>
                </div>
                <div className="form-group mb-3">
                  <label>Meta Keywords</label>
                  <textarea
                    name="meta_keywords"
                    onChange={handleinput}
                    value={categoryInput.meta_keywords}
                    className="form-control"
                  ></textarea>
                  <span className="text-danger">
                    {categoryInput.error_list.meta_keywords}
                  </span>
                </div>
                <div className="form-group mb-3">
                  <label>Meta Description</label>
                  <textarea
                    name="meta_description"
                    onChange={handleinput}
                    value={categoryInput.meta_description}
                    className="form-control"
                  ></textarea>
                  <span className="text-danger">
                    {categoryInput.error_list.meta_description}
                  </span>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary px-4 float-end my-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Category;
