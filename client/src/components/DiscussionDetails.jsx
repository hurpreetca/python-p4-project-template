import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function DiscussionDetails() {
  let { id } = useParams();
  console.log("id is: ", id);
  const idAsInt = parseInt(id, 10);
  const [selectedDiscussion, setSelectedDiscussion] = useState({});
  useEffect(() => {
    fetch(`/discussions/${idAsInt}`)
      .then((res) => res.json())
      .then((data) => setSelectedDiscussion(data.discussion));
  }, [idAsInt]);
  console.log("this is data", selectedDiscussion);
  return (
    <div>
      <p>Hi this is the discussion details</p>
    </div>
  );
}

export default DiscussionDetails;
