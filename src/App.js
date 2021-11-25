import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./assets/frontend/css/style.css"
import Login from "./components/frontend/auth/Login";
import Regtr from "./components/frontend/auth/Regtr";
import AdminPrivateRoute from "./AdminPrivateRoute";

import axios from "axios";
import PublicRoute from "./PublicRoute";

// axios.defaults.baseURL = "http://192.168.43.54:8000";
// axios.defaults.baseURL = "http://192.168.42.64:8000";
// axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.baseURL = "https://frozen-plains-70593.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <AdminPrivateRoute path="/admin" name="Admin" />

          <PublicRoute path="/" name="Home" />

          <Route path="/login">
            {localStorage.getItem("auth_token") ? (
              <Redirect to="/" />
            ) : (
              <Login />
            )}
          </Route>

          <Route path="/register">
            {localStorage.getItem("auth_token") ? (
              <Redirect to="/" />
            ) : (
              <Regtr />
            )}
          </Route>

          <PublicRoute path="/" name="Home" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
