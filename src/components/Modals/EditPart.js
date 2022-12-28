import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect, useRef, useContext } from "react";
import { UIContext } from "../UIProvider";
import { INSTRUMENTS, inBounds, MIN_VOLUME, MAX_VOLUME } from "../../util";
import RangeSlider from "react-bootstrap-range-slider";

export default function EditPartModal() {
  const UI = useContext(UIContext);
  const key = "editPart";

  const show = UI.Modals.showing(key);
  const onHide = () => UI.Modals.hide(key);
  const i = UI.Modals.getTag(key);

  const [name, setName] = useState("");
  const [instrument, setInstrument] = useState("");
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    if (!inBounds(UI.parts, i)) return;
    const part = UI.parts[i];
    setName(part.getName());
    setInstrument(part.getInstrument());
    setVolume(part.getVolume());
  }, [UI.parts, i]);

  const onNameChange = (e) =>
    UI.updateActivePart((part) => part.setName(e.target.value));

  const onInstrumentChange = (e) =>
    UI.updateActivePart((part) => part.setInstrument(e.target.value));

  const onVolumeChange = (e) =>
    UI.updateActivePart((part) => part.setVolume(e.target.value));

  const formRef = useRef();
  useEffect(() => {
    if (formRef.current && show) setTimeout(() => formRef.current.focus(), 200);
  }, [show, formRef]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (formRef.current) formRef.current.blur();
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Part:</Modal.Title>
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
              onChange={onNameChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>
              <b>Instrument:</b>
            </Form.Label>
            <Form.Select value={instrument} onChange={onInstrumentChange}>
              {INSTRUMENTS.map((instrument) => (
                <option key={instrument}>{instrument}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              <b>Volume:</b>
            </Form.Label>
            <RangeSlider
              className="pb-0"
              value={Math.round(volume)}
              tooltipLabel={(val) => `${val}dB`}
              onChange={onVolumeChange}
              min={MIN_VOLUME}
              max={MAX_VOLUME}
              step={1}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
