import { Modal, Button } from "react-bootstrap";
import { CHROMATIC_NOTES } from "../../util";
import { useContext } from "react";
import { UIContext } from "../UIProvider";

export default function AddNoteModal() {
  const UI = useContext(UIContext);
  const key = "addNote";

  const show = UI.Modals.showing(key);
  const onHide = () => UI.Modals.hide(key);

  const depth = UI.Modals.getTag(key);
  const node = UI.getNodeAtDepth(depth);
  if (!node) return null;
  const parent = node.getParent();
  const map = node.getMap();

  const onNoteClick = (i) => () =>
    !map.some((x) => x.index === i) ? UI.addIndexAtDepth(depth, i) : {};

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add a Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {parent.map((note, i) => (
          <Button
            key={`${note}-${i}`}
            variant={map.some((x) => x.index === i) ? "dark" : "light"}
            className={`border border-dark rounded d-inline-block m-1 px-1 ${
              map.some((x) => x.index === i) ? "fw-bold" : "fw-light"
            }`}
            style={{
              textAlign: "center",
              width: "40px",
              cursor: map.some((x) => x.index === i) ? "default" : "pointer",
            }}
            onClick={onNoteClick(i)}
          >
            {CHROMATIC_NOTES[note % 12]}{" "}
          </Button>
        ))}{" "}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
