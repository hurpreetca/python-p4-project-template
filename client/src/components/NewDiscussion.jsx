import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

function NewDiscussion({ discussions, setDiscussions, userId }) {
  const [discussionTopic, setDiscussionTopic] = useState("");
  const history = useHistory();
  console.log(discussions);
  const handleSubmit = (e) => {
    e.preventDefault();

    const newDiscussion = {
      discussion_topic: discussionTopic,
      user_id: userId,
    };

    //New discussion topic post
    fetch("/discussions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDiscussion),
    })
      .then((response) => response.json())
      .then((createdDiscussion) => {
        setDiscussions((prevDiscussions) => [
          ...prevDiscussions,
          createdDiscussion,
        ]);
        setDiscussionTopic("");
        history.push("/discussions");
      })
      .catch((error) => {
        console.error("Error creating discussion:", error);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="discussionTopic">
        <Form.Label>Discussion Topic</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your discussion topic"
          value={discussionTopic}
          onChange={(e) => setDiscussionTopic(e.target.value)}
          className="mb-2"
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-2">
        {" "}
        Submit
      </Button>
    </Form>
  );
}

export default NewDiscussion;
