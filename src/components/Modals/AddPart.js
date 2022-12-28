import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect, useRef, useContext } from "react";
import Part from "../../classes/Part";
import { UIContext } from "../UIProvider";
import { INSTRUMENTS, DEFAULT_INSTRUMENT } from "../../util";

export default function AddPartModal() {
  const UI = useContext(UIContext);
  const key = "addPart";

  const show = UI.Modals.showing(key);
  const onHide = () => UI.Modals.hide(key);

  const [value, setValue] = useState("");
  const [instrument, setInstrument] = useState(DEFAULT_INSTRUMENT);

  const onSubmit = (e) => {
    e.preventDefault();

    let name = value;
    if (!name.length) name = `Part ${UI.parts.length + 1}`;
    UI.addPart(new Part({ name, instrument }));

    onHide();
    setTimeout(() => {
      setValue("");
      setInstrument(DEFAULT_INSTRUMENT);
    }, 200);
  };

  const formRef = useRef();
  useEffect(() => {
    if (formRef.current && show) setTimeout(() => formRef.current.focus(), 200);
  }, [show, formRef]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Part:</Modal.Title>
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
              value={value}
              onChange={(e) => setValue(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              <b>Instrument:</b>
            </Form.Label>
            <Form.Select
              value={instrument}
              onChange={(e) => setInstrument(e.target.value)}
            >
              {INSTRUMENTS.map((instrument) => (
                <option key={instrument}>{instrument}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="success" onClick={onSubmit}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
