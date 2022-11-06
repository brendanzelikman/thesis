import { Modal, Button, Form } from "react-bootstrap";
import { useEffect, useRef, useContext } from "react";
import { UIContext } from "../UIProvider";
import RangeSlider from "react-bootstrap-range-slider";
import { MIN_TEMPO, MAX_TEMPO } from "../../util";

export default function EditTempoModal() {
  const UI = useContext(UIContext);
  const key = "editTempo";

  const show = UI.Modals.showing(key);
  const onHide = () => UI.Modals.hide(key);

  const formRef = useRef();
  useEffect(() => {
    if (formRef.current && show) formRef.current.focus();
  }, [show, formRef]);

  const onSubmit = (e) => {
    e.preventDefault();
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Change Global Tempo:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>
              <b>Tempo:</b> {`${Math.round(UI.tempo)}BPM`}
            </Form.Label>
            <RangeSlider
              value={Math.round(UI.tempo)}
              tooltipLabel={(val) => `${val}BPM`}
              onChange={(e) => UI.setTempo(e.target.value)}
              min={MIN_TEMPO}
              max={MAX_TEMPO}
              step={1}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => UI.resetTempo()}>
          Reset
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
