import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";

const EditCategory = (props) => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const [categoryInput, setCategory] = useState([]);
  const [error, setError] = useState([]);

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

  const updateCategory = (e) => {
    e.preventDefault();

    const category_id = props.match.params.id;
    const data = categoryInput;
    axios.put(`/api/update-category/${category_id}`, data).then((res) => {
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
