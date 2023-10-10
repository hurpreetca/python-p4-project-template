import React, { useState } from "react";
import { useFormik } from "formik";
import "./Signup.css";
import { useHistory } from "react-router-dom";
import * as yup from "yup";

function Signup({ setIsLoggedIn, fetchUser }) {
  const [errors, setErrors] = useState([]);
  const navigate = useHistory();

  const formSchema = yup.object().shape({
    name: yup.string().required("Must enter a name").max(20),
    email: yup.string().email("Invalid email").required("Must enter email"),
    password_hash: yup.string().required("Password required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password_hash: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      }).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            console.log(data);
            setIsLoggedIn(true);
            fetchUser(data);
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
      <h2 className="form-heading">User Signup!</h2>
      <form className="signup-form" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="name"
            className="form-input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          <p className="error-text">{formik.errors.name}</p>
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            name="email"
            className="form-input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <p className="error-text">{formik.errors.email}</p>
        </div>
        <div className="form-group">
          <label htmlFor="password_hash" className="form-label">
            Password
          </label>
          <input
            id="password_hash"
            name="password_hash"
            type="password"
            className="form-input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password_hash}
          />
          <p className="error-text">{formik.errors.password_hash}</p>
        </div>
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
