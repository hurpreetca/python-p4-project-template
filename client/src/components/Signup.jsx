import React, { useState } from "react";
import { useFormik, Field, Form, ErrorMessage } from "formik";
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
}

export default Signup;
