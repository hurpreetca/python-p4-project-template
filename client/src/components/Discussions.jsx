import React, { useEffect, useState } from "react";
import DiscussionList from "./DiscussionList.jsx";

function Discussions() {
  const [discussions, setDiscussions] = useState([]);
  // Fetch all the discussions
  useEffect(() => {
    fetch("/discussions")
      .then((response) => response.json())
      .then((data) => {
        setDiscussions(data);
        console.log("this is discussions data", discussions);
      });
  });

  return (
    <div className="main-div">
      <DiscussionList discussions={discussions} />
    </div>
  );
}

export default Discussions;
