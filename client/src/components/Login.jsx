import React, { useState } from "react";
import { useFormik, Field, Form, ErrorMessage } from "formik";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Must enter email"),
    password: yup.string().required("Password required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/login", {
        method: "POST",
        header: {
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
            <label htmlFor="password">Password</label>
            <br />
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <p style={{ color: "red" }}> {formik.errors.password}</p>
          </>
          <br />
        </form>
      </>
    </div>
  );
}

export default Login;
