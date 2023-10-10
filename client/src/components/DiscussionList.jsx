import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";
import { useHistory } from "react-router-dom";

function DiscussionList({ id, discussion_topic }) {
  const history = useHistory();
  function handleClick(id) {
    const idAsInt = parseInt(id, 10);
    history.push(`/discussions/${idAsInt}`);
  }
  return (
    <Table striped bordered hover>
      <tbody>
        <tr>
          <td>
            <ListGroup>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
                key={id}
                onClick={(e) => handleClick(id)}
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold"></div>
                  {discussion_topic}
                </div>
              </ListGroup.Item>
            </ListGroup>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

export default DiscussionList;
