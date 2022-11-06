import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect, useRef, useContext } from "react";
import { UIContext } from "../UIProvider";
import { inBounds } from "../../util";

export default function RenamePresetModal() {
  const UI = useContext(UIContext);
  const key = "renamePreset";

  const show = UI.Modals.showing(key);
  const onHide = () => UI.Modals.hide(key);
  const i = UI.Modals.getTag(key);

  const [value, setValue] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    UI.renamePreset(i + 1, value);
    UI.updatePresets();
    onHide();
  };

  useEffect(() => {
    if (!inBounds(UI.customPresets, i)) return;
    const value = UI.customPresets[i];
    setValue(value.slice(0, value.indexOf("_")));
  }, [UI.customPresets, i]);

  const formRef = useRef();
  useEffect(() => {
    if (formRef.current && show) setTimeout(() => formRef.current.focus(), 200);
  }, [show, formRef]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Rename Part:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Control
            ref={formRef}
            placeholder="Name"
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
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
