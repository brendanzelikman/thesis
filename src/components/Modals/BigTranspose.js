import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect, useRef, useContext } from "react";
import { UIContext } from "../UIProvider";

export default function BigTransposeModal() {
  const UI = useContext(UIContext);
  const key = "bigTranspose";

  const show = UI.Modals.showing(key);
  const onHide = () => UI.Modals.hide(key);
  const depth = UI.Modals.getTag(key);

  const [value, setValue] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const amounts = value.split(",");
    for (let i = 0; i < amounts.length; i++) {
      const amount = amounts[i];
      const int = parseInt(amount);
      if (isNaN(int)) return;
      UI.TransposeNotesAtDepth(depth, int);
    }

    onHide();
    setTimeout(() => setValue(""), 200);
  };

  const formRef = useRef();
  useEffect(() => {
    if (formRef.current && show) setTimeout(() => formRef.current.focus(), 200);
  }, [show, formRef]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Transpose By:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Control
            ref={formRef}
            placeholder="0"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></Form.Control>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="success" onClick={onSubmit}>
          Go
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
