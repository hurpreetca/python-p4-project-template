import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, ListGroup, Button, Form } from "react-bootstrap";

function DiscussionDetails({ userId }) {
  const [selectedDiscussion, setSelectedDiscussion] = useState({});
  const [newComment, setNewComment] = useState("");
  const [updatedText, setUpdatedText] = useState("");
  let { id } = useParams();
  let history = useHistory();
  const idAsInt = parseInt(id, 10);

  useEffect(() => {
    fetch(`/discussions/${idAsInt}`)
      .then((res) => res.json())
      .then((data) => setSelectedDiscussion(data.discussion));
  }, [idAsInt]);

  const discussion_topic = selectedDiscussion.discussion_topic;
  const comments = selectedDiscussion.comments;

  //Edit a discussion topic
  const handleEditDiscussion = () => {
    fetch(`/discussions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ discussion_topic: updatedText }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSelectedDiscussion(data.discussion);
      });
  };
  //Delete a discussion topic
  const handleDeleteDiscussion = () => {
    fetch(`/discussions/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status === 204) {
          history.push("/discussions");
        } else {
          console.error("Failed to delete discussion");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Send a POST request to your server to add the new comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/discussions/${idAsInt}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment_text: newComment,
          discussion_id: idAsInt,
          user_id: userId,
        }),
      });

      if (response.ok) {
        const updatedDiscussion = await response.json();
        setSelectedDiscussion(updatedDiscussion);
        setNewComment(""); // Clear the comment input field
      } else {
        console.error("Failed to add comment.");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <>
      <Card>
        <Card.Header>
          <h3>
            <strong>Discussion Topic: </strong>
            {discussion_topic}
          </h3>
          <Button variant="danger" onClick={handleEditDiscussion}>
            Edit
          </Button>
          <Button variant="danger" onClick={handleDeleteDiscussion}>
            Delete
          </Button>
        </Card.Header>
      </Card>
      <Card>
        <Card.Header>
          <h5>Comments</h5>
        </Card.Header>
        <ListGroup variant="flush">
          {comments ? (
            comments.map((comment) => (
              <ListGroup.Item
                key={comment.id}
                id={comment.id}
                user_id={comment.user_id}
              >
                <p>{comment.comment_text}</p>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>No comments available.</ListGroup.Item>
          )}
        </ListGroup>
      </Card>

      <Card.Body>
        <Form onSubmit={handleCommentSubmit}>
          <Form.Group>
            <Form.Label>Add a new comment:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit">Post Comment</Button>
        </Form>
      </Card.Body>
    </>
  );
}

export default DiscussionDetails;
