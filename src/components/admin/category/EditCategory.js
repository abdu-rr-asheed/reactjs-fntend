import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";

const EditCategory = (props) => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const [categoryInput, setCategory] = useState([]);
  const [error, setError] = useState([]);
  const [picture, setPicture] = useState([]);

  useEffect(() => {
    document.title = "Edit Category - Admin";
    const category_id = props.match.params.id;

    axios.get(`/api/edit-category/${category_id}`).then((res) => {
      if (res.data.status === 200) {
        setCategory(res.data.category);
      } else {
        swal("error", res.data.message, "error");
        history.push("/admin/view-category");
      }
      setLoading(false);
    });
  }, [props.match.params.id, history]);

  const handleinput = (e) => {
    e.persist();

    setCategory({ ...categoryInput, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setPicture({ image: e.target.files[0] });
  };

  const updateCategory = (e) => {
    e.preventDefault();

    const category_id = props.match.params.id;
    const formData = new FormData();
    formData.append("image", picture.image);
    formData.append("meta_title", categoryInput.meta_title);
    formData.append("meta_keywords", categoryInput.meta_keywords);
    formData.append("meta_description", categoryInput.meta_description);
    formData.append("slug", categoryInput.slug);
    formData.append("name", categoryInput.name);
    formData.append("description", categoryInput.description);
    formData.append("status", categoryInput.status);

    axios.post(`/api/update-category/${category_id}`, formData).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        history.push("/admin/view-category");
        setError([]);
      } else if (res.data.status === 422) {
        setError(res.data.errors);
        swal("All fields are Mandetory", "", "error");
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        history.push("/admin/view-category");
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
    <div className="container-fluid px-4">
      <div className="card mt-4">
        <div className="card-header">
          <h4>
            Edit Category
            <Link
              to="/admin/view-category"
              className="btn btn-primary btn-sm float-end"
            >
              Back
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <form onSubmit={updateCategory}>
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
                  <span className="text-danger">{error.slug}</span>
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
                  <span className="text-danger">{error.name}</span>
                </div>

                <div className="row">
                  <div className="col-md-4 form-group mb-3">
                    <label>Description</label>
                    <textarea
                      name="description"
                      onChange={handleinput}
                      value={categoryInput.description}
                      className="form-control"
                    ></textarea>
                    <span className="text-danger">{error.description}</span>
                  </div>
                  <div className="col-md-4 form-group md-3">
                    <label>Image</label>
                    <input
                      type="file"
                      name="image"
                      onChange={handleImage}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-4 form-group md-3">
                    <img
                      src={`http://localhost:8000/${categoryInput.image}`}
                      alt={categoryInput.name}
                      loading="lazy"
                      width="150"
                    />
                  </div>
                </div>

                <div className="form-group mb-3">
                  <label>Description</label>
                  <textarea
                    name="description"
                    onChange={handleinput}
                    value={categoryInput.description}
                    className="form-control"
                  ></textarea>
                  <span className="text-danger">{error.description}</span>
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
                  <span className="text-danger">{error.meta_title}</span>
                </div>
                <div className="form-group mb-3">
                  <label>Meta Keywords</label>
                  <textarea
                    name="meta_keywords"
                    onChange={handleinput}
                    value={categoryInput.meta_keywords}
                    className="form-control"
                  ></textarea>
                  <span className="text-danger">{error.meta_keywords}</span>
                </div>
                <div className="form-group mb-3">
                  <label>Meta Description</label>
                  <textarea
                    name="meta_description"
                    onChange={handleinput}
                    value={categoryInput.meta_description}
                    className="form-control"
                  ></textarea>
                  <span className="text-danger">{error.meta_description}</span>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary px-4 float-end my-2"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
