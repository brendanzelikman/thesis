import { Modal, Button } from "react-bootstrap";
import { useRef, useEffect, useContext } from "react";
import { UIContext } from "../UIProvider";

export default function RemovePartModal() {
  const UI = useContext(UIContext);
  const key = "removePart";

  const show = UI.Modals.showing(key);
  const onHide = () => UI.Modals.hide(key);

  const part = UI.parts[UI.activePart];
  const buttonRef = useRef();

  const onSubmit = () => {
    UI.removePart(UI.activePart);
    onHide();
  };
  useEffect(() => {
    if (show && buttonRef.current) buttonRef.current.focus();
  }, [buttonRef, show]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Remove {part.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to remove this part?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="danger" onClick={onSubmit} ref={buttonRef}>
          Remove
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
