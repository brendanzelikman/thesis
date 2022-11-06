import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect, useRef, useContext } from "react";
import { UIContext } from "../UIProvider";
import { removeWhitespace } from "../../util";

export default function EditNameModal() {
  const UI = useContext(UIContext);
  const key = "editName";

  const show = UI.Modals.showing(key);
  const onHide = () => UI.Modals.hide(key);

  const [name, setName] = useState("");

  useEffect(() => {
    setName(UI.projectName);
  }, [UI.projectName]);

  const formRef = useRef();
  useEffect(() => {
    if (formRef.current && show) setTimeout(() => formRef.current.focus(), 200);
  }, [show, formRef]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (removeWhitespace(name)) {
      UI.setProjectName(name);
    }
    if (formRef.current) formRef.current.blur();
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Name:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-4">
            <Form.Label>
              <b>Name:</b>
            </Form.Label>
            <Form.Control
              ref={formRef}
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onSubmit}>
          Save
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
