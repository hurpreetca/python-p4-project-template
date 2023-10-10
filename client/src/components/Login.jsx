import React, { useState } from "react";
import { useFormik } from "formik";
import "./Login.css";
import { useHistory } from "react-router-dom";
import * as yup from "yup";

function Login({ onLogin, setIsLoggedIn, setUserId }) {
  const [errors, setErrors] = useState([]);
  const navigate = useHistory();

  const formSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Must enter email"),
    password_hash: yup.string().required("Password required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password_hash: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      }).then((res) => {
        if (res.ok) {
          res.json().then((user) => {
            console.log(user);
            onLogin(user);
            setIsLoggedIn(true);
            setUserId(user.id);
            navigate.push("/");
          });
        } else {
          res.json().then((err) => {
            setErrors([err.errors]);
          });
        }
      });
    },
  });
  return (
    <div className="form-container">
      <h2>User Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <p className="error-text">{formik.errors.email}</p>
        </div>

        <div className="form-group">
          <label htmlFor="password_hash">Password</label>
          <input
            id="password_hash"
            name="password_hash"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password_hash}
          />
          <p className="error-text">{formik.errors.password_hash}</p>
        </div>

        <div className="button-container">
          <button type="submit" className="login-button">
            Login
          </button>
          <button
            type="button"
            className="signup-button"
            onClick={() => navigate.push("/signup")}
          >
            Signup
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
