import React from "react";
import { Link } from "react-router-dom";
import img404 from "../../assets/frontend/images/error-404-monochrome.svg";

const Page404 = () => {
  document.title = "E-Com - 404";
  return (
    <div id="layoutError">
      <div id="layoutError_content">
        <main>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="text-center mt-4">
                  <img className="mb-4 img-error" src={img404} alt={img404} />
                  <p className="lead">
                    This requested URL was not found on this server.
                  </p>
                  <Link to="/admin/dashboard">
                    <i className="fas fa-arrow-left me-1"></i>
                    Return to Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Page404;
