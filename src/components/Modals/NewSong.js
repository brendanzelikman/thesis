import { Modal, Button } from "react-bootstrap";
import { useRef, useEffect, useContext } from "react";
import { UIContext } from "../UIProvider";

export default function NewSongModal() {
  const UI = useContext(UIContext);
  const key = "newSong";

  const show = UI.Modals.showing(key);
  const onHide = () => UI.Modals.hide(key);
  const buttonRef = useRef();

  const onSubmit = () => {
    UI.resetParts();
    UI.resetProjectName();
    onHide();
  };
  useEffect(() => {
    if (show && buttonRef.current) buttonRef.current.focus();
  }, [buttonRef, show]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Song</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete everything?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onSubmit} ref={buttonRef}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
