import React, { useEffect, useState } from "react";

function Discussions() {
  let { id } = useParams();
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    fetch("/discussions")
      .then((res) => res.json())
      .then(setDiscussions);
  }, []);

  const allDiscussions = discussions.map((discussion) => {});
  return <div>Discussions</div>;
}

export default Discussions;
