import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import DiscussionListGroup from "./DiscussionListGroup";

function DiscussionList({ discussions }) {
  const displayDiscussionList = discussions.map((discussion) => {
    console.log("one last time", discussions);
  });
  return (
    <div>
      <ListGroup as="ul">
        <ListGroup.Item as="li" active>
          {displayDiscussionList}
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default DiscussionList;
