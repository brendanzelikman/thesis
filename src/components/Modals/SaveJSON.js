import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect, useRef, useContext } from "react";
import { UIContext } from "../UIProvider";
import { removeWhitespace } from "../../util";

export default function SaveJSONModal() {
  const UI = useContext(UIContext);
  const key = "saveJSON";

  const show = UI.Modals.showing(key);
  const onHide = () => UI.Modals.hide(key);

  const [name, setName] = useState("");

  useEffect(() => setName(UI.projectName), [UI.projectName]);

  const formRef = useRef();
  useEffect(() => {
    if (!show) setTimeout(() => setName(""), 200);
    if (formRef.current && show) setTimeout(() => formRef.current.focus(), 200);
  }, [show, formRef]);

  const onSubmit = (e) => {
    e.preventDefault();
    const dotIndex = name.indexOf(".json");
    UI.saveToFile(dotIndex > -1 ? name.slice(0, dotIndex) : name);
    onHide();

    if (formRef.current) formRef.current.blur();

    setTimeout(() => setName(""), 200);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Save As:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Control
            ref={formRef}
            placeholder={"Name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="success" onClick={onSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
