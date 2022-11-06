import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect, useRef, useContext } from "react";
import { UIContext } from "../UIProvider";
import { inBounds, CHROMATIC_NOTES, removeWhitespace } from "../../util";
import { PRESETS } from "../../presets";
import System from "../../classes/System";
import Timeline from "../../classes/Timeline";

export default function LoadPresetModal() {
  const UI = useContext(UIContext);
  const key = "loadPreset";

  const show = UI.Modals.showing(key);
  const onHide = () => UI.Modals.hide(key);

  const [value, setValue] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!removeWhitespace(value)) return;

    const categories = Object.keys(PRESETS);
    const presets = categories.map((key) => PRESETS[key]).flat();

    const createRegex = (key) => new RegExp(`^([a-gA-G]#?)?(\\s?${key})$`);

    const match = presets.find(
      (preset) =>
        !!createRegex(preset.key).test(value) ||
        preset.aliases.some((alias) => !!createRegex(alias).test(value))
    );
    if (match) {
      const matches = value.match(`^([a-gA-G]#?)?(.*)$`);
      const key = matches[1] ? matches[1].toUpperCase() : "C";
      const keyOffset = Math.max(CHROMATIC_NOTES.indexOf(key), 0);
      const newSystem = System.createFromKey(match.system);
      const newTimeline = Timeline.createFromKey(match.timeline);
      UI.updateActivePart((part) =>
        part
          .setSystem(newSystem.TransposeNotesAtDepth(0, keyOffset))
          .setTimeline(newTimeline)
      );
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
        <Modal.Title>Load Preset:</Modal.Title>
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
          Load
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
