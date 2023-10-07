import React, { useState } from "react";
import { useFormik, Field, Form, ErrorMessage } from "formik";
import "client/src/components/Signup.css";

function Signup() {
  const [signUp, setSignUp] = useState(false);

  const formSchema = yup.object().shape({
    name: signUp
      ? yup.string().required("Must enter a name").max(20)
      : yup.string().optional(),
    email: yup.string().email("Invalid email").required("Must enter email"),
    password: yup.string().required("Password required"),
    confirmedPassword: signUp
      ? yup.string().optional()
      : yup.string().oneOf([yup.ref("password")], "Passwords do not match"),
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
      fetch(signUp ? "/signup" : "/login", {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      }).then((res) => {
        if (res.status == 200) {
          setRefreshPage(!refreshPage);
        }
      });
    },
  });
  //   <>
  //   <h1 className= "header"> SignUp</h1>
  //   </>
}

export default Signup;
