import { Modal, Button } from "react-bootstrap";
import { CHROMATIC_NOTES } from "../../util";
import { useContext, useEffect } from "react";
import { UIContext } from "../UIProvider";

export default function RemoveNoteModal() {
  const UI = useContext(UIContext);
  const key = "removeNote";

  const show = UI.Modals.showing(key);
  const onHide = () => UI.Modals.hide(key);

  const depth = UI.Modals.getTag(key);
  const node = UI.getNodeAtDepth(depth);
  const notes = node ? node.getNotes() : [];

  useEffect(() => {
    if (!notes.length && show) onHide();
  }, [notes, show]);

  if (!node) return null;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Remove a Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {notes.map((note, i) => (
          <Button
            variant="light"
            key={`${note}-${i}`}
            className="border border-dark rounded d-inline-block m-1 px-1"
            style={{ textAlign: "center", width: "40px" }}
            onClick={() => UI.removeIndexAtDepth(depth, i)}
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
