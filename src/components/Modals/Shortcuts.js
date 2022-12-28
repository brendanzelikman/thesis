import { Modal, Button, Table } from "react-bootstrap";
import { useRef, useContext, useEffect } from "react";
import { UIContext } from "../UIProvider";
import { SHORTCUTS } from "../../shortcuts";

export default function ShortcutsModal() {
  const UI = useContext(UIContext);
  const key = "shortcuts";

  const show = UI.Modals.showing(key);
  const onHide = () => UI.Modals.hide(key);

  const buttonRef = useRef();

  useEffect(() => {
    if (show && buttonRef.current) buttonRef.current.focus();
  }, [show, buttonRef.current]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Shortcuts</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table bordered>
          <thead>
            <tr>
              <th>Key Binding</th>
              <th>Command</th>
            </tr>
          </thead>
          <tbody>
            {SHORTCUTS.map(({ key, command }) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{command}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} ref={buttonRef}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
