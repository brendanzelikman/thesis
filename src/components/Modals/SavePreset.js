import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect, useRef, useContext } from "react";
import { UIContext } from "../UIProvider";

export default function SavePresetModal() {
  const UI = useContext(UIContext);
  const key = "savePreset";

  const show = UI.Modals.showing(key);
  const onHide = () => UI.Modals.hide(key);

  const defaultName = `Preset ${UI.customPresets.length + 1}`;
  const [name, setName] = useState("");

  const formRef = useRef();
  useEffect(() => {
    if (formRef.current && show) formRef.current.focus();
  }, [show, formRef]);

  const onSubmit = (e) => {
    e.preventDefault();
    UI.addPreset(`${name || defaultName}_${UI.key}`);

    onHide();
    if (formRef.current) formRef.current.blur();
    setTimeout(() => setName(""), 200);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Save Preset As:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Control
            ref={formRef}
            placeholder={defaultName}
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
