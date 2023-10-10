import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Home from "./Home.jsx";
import Discussions from "./Discussions.jsx";
import NavbarLocal from "./NavbarLocal.jsx";
import DiscussionDetails from "./DiscussionDetails.jsx";
import NewDiscussion from "./NewDiscussion.jsx";
import { useHistory } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errors, setErrors] = useState([]);
  const [discussions, setDiscussions] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    fetch("/current_user").then((res) => {
      if (res.ok) {
        console.log("Fetch User", res);
        res.json().then((userData) => {
          setUser(userData);
          setUserId(userData.id);
          setIsLoggedIn(true);
          console.log(userData.id);
        });
      }
    });
  };
  const onLogin = (user) => setUser(user);
  // Fetch all the discussions
  useEffect(() => {
    try {
      fetch("/discussions")
        .then((response) => response.json())
        .then((data) => {
          console.log("this is data", data);
          setDiscussions(data.discussion_list);
        });
    } catch (error) {
      console.error("error fecthing data", error);
    }
  }, []);

  const handleLogout = () => {
    fetch("/logout", {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 200) {
        setIsLoggedIn(false);
        setUser(null);
        setUserId(null);
        history.push("/");
      } else {
        console.error("Logout error:", res.statusText);
      }
    });
  };

  return (
    <div>
      <NavbarLocal handleLogout={handleLogout} isLoggedIn={isLoggedIn} />
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
        <Route exact path="/">
          <Home isLoggedIn={isLoggedIn} />
        </Route>
        <Route exact path="/discussions">
          <Discussions discussions={discussions} />
        </Route>
        <Route exact path="/discussions/:id">
          <DiscussionDetails discussions={discussions} userId={userId} />
        </Route>
        <Route exact path="/newdiscussion">
          <NewDiscussion
            userId={userId}
            discussions={discussions}
            setDiscussions={setDiscussions}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
