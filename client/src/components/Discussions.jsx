import React from "react";
import DiscussionList from "./DiscussionList.jsx";

function Discussions({  discussions }) {
  return discussions.map((discussion) => {
    return (
      <DiscussionList
        key={discussion.id}
        id={discussion.id}
        discussion_topic={discussion.discussion_topic}
        user_id={discussion.user_id}
      />
    );
  });
}

export default Discussions;
