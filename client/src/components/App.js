import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Home from "./Home.jsx";
import Discussions from "./Discussions.jsx";
import NavbarLocal from "./NavbarLocal.jsx";
function App() {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    fetch("/current_user").then((res) => {
      if (res.ok) {
        console.log("Fetch User", res);
        res.json().then((userData) => {
          setUserId(userData.id);
          setUser(userData);
          setIsLoggedIn(true);
        });
      } else {
        res.json().then((errorData) => {
          setErrors([errorData.errors]);
          console.log(errors);
        });
      }
    });
  };
  const onLogin = (user) => setUser(user);
  const handleLogout = () => {
    fetch("/logout", {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 204) {
        setIsLoggedIn(false);
        setUser(null);
        setUserId(null);
      } else {
        console.error("Logout error:", res.statusText);
      }
    });
  };

  return (
    <Switch>
      <Route exact path="/navbar">
        <NavbarLocal />{" "}
      </Route>
      <Route exact path="/login">
        <Login
          onLogin={onLogin}
          setIsLoggedIn={setIsLoggedIn}
          setErrors={setErrors}
          setUserId={setUserId}
        />
      </Route>
      <Route exact path="/signup">
        <Signup
          setIsLoggedIn={setIsLoggedIn}
          fetchUser={fetchUser}
          onLogin={onLogin}
        />
      </Route>
      <Route exact path="/home">
        <Home />
      </Route>
      <Route exact path="/discussions">
        <Discussions user={user} userId={userId} />
      </Route>
    </Switch>
  );
}

export default App;
