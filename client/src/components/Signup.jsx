import React, { useState } from "react";
import { useFormik } from "formik";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

function Signup({ setUser }) {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    name: yup.string().required("Must enter a name").max(20),
    email: yup.string().email("Invalid email").required("Must enter email"),
    password: yup.string().required("Password required"),
    confirmedPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords do not match"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmedPassword: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/signup", {
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
      <h2>User Signup!</h2>
      <>
        <form onSubmit={formik.handleSubmit}>
          <>
            <label htmlFor="name">Name</label>
            <br />
            <input
              id="name"
              name="name"
              type="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            <p style={{ color: "red" }}> {formik.errors.name}</p>
            <br />
          </>
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
          <>
            <label htmlFor="confirmedPassword">Confirm Password</label>
            <br />
            <input
              id="password"
              name="confirmedPassword"
              type="confirmedPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmedPassword}
            />
            <p style={{ color: "red" }}> {formik.errors.confirmedPassword}</p>
          </>
          <br />
        </form>
      </>
    </div>
  );
}

export default Signup;
