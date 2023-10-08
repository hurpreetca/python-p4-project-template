import React, { useState } from "react";
import { useFormik } from "formik";
import "./Login.css";
import { useHistory } from "react-router-dom";
import * as yup from "yup";

function Login({ setUser }) {
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
          res.json().then((data) => {
            console.log(data);
            setUser(data);
            navigate("/");
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
      <h2> User Login</h2>
      <>
        <form onSubmit={formik.handleSubmit}>
          <>
            <label htmlFor="email">Email</label>
            <br />
            <input
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <p style={{ color: "red" }}> {formik.errors.email}</p>
            <br />
          </>
          <>
            <label htmlFor="password_hash">Password</label>
            <br />
            <input
              id="password_hash"
              name="password_hash"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password_hash}
            />
            <p style={{ color: "red" }}> {formik.errors.password_hash}</p>
          </>
          <br />
          <button type="submit">{"Login"}</button>
        </form>
      </>
    </div>
  );
}

export default Login;
