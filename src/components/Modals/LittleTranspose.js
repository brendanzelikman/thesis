import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect, useRef, useContext } from "react";
import { UIContext } from "../UIProvider";

export default function LittleTransposeModal() {
  const UI = useContext(UIContext);
  const [value, setValue] = useState("");
  const key = "littleTranspose";

  const show = UI.Modals.showing(key);
  const onHide = () => UI.Modals.hide(key);
  const depth = UI.Modals.getTag(key);

  const formRef = useRef();
  useEffect(() => {
    if (formRef.current && show) setTimeout(() => formRef.current.focus(), 200);
  }, [show, formRef]);

  const onSubmit = (e) => {
    e.preventDefault();

    const amounts = value.split(",");
    for (let i = 0; i < amounts.length; i++) {
      const amount = amounts[i];
      const int = parseInt(amount);
      if (isNaN(int)) return;
      UI.transposeNotesAtDepth(depth, int);
    }

    onHide();
    if (formRef.current) formRef.current.blur();
    setTimeout(() => setValue(""), 200);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>transpose By:</Modal.Title>
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
        <Button variant="secondary" onClick={UI.hidetranspose}>
          Close
        </Button>
        <Button variant="success" onClick={onSubmit}>
          Go
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
