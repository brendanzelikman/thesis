import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect, useRef, useContext } from "react";
import { UIContext } from "../UIProvider";
import { DEFAULT_VOLUME, MIN_VOLUME, MAX_VOLUME } from "../../util";
import RangeSlider from "react-bootstrap-range-slider";

export default function EditVolumeModal() {
  const UI = useContext(UIContext);
  const key = "editVolume";

  const show = UI.Modals.showing(key);
  const onHide = () => UI.Modals.hide(key);

  const [volume, setVolume] = useState(0);

  useEffect(() => {
    setVolume(UI.volume);
  }, [UI.parts]);

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
        <Modal.Title>Change Volume:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>
              <b>Volume: </b>
              {`${UI.volume}dB`}
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
        <Button
          variant="primary"
          onClick={() =>
            UI.updateActivePart((part) => part.setVolume(DEFAULT_VOLUME))
          }
        >
          Reset
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
