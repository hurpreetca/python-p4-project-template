import React from "react";
import DiscussionList from "./DiscussionList.jsx";
import ListGroup from "react-bootstrap/ListGroup";

function Discussions({ user, userId, isLoggedIn, discussions }) {
  const displayDiscussions = discussions.map((discussion) => {
    return (
      <DiscussionList
        key={discussion.id}
        id={discussion.id}
        discussion_topic={discussion.discussion_topic}
        user_id={discussion.user_id}
      />
    );
  });
  return (
    <>
      {" "}
      <ListGroup variant="flush">{displayDiscussions}</ListGroup>
    </>
  );
}

export default Discussions;
