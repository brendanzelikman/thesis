import { useContext } from "react";
import { UIContext } from "../UIProvider";
import { Navbar as BSNavbar, Nav, Button } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import { MIN_TEMPO, MAX_TEMPO } from "../../util";

export const NAV_HEIGHT = 70;

export default function Navbar() {
  const UI = useContext(UIContext);

  const onNameClick = (e) => {
    e.preventDefault();
    UI.Modals.show("editName");
  };

  const ModalButton = ({ onClick, variant, children }) => (
    <Button
      className="mx-3"
      variant={variant}
      style={{
        backgroundColor: "#333",
        color: "white",
        minWidth: "180px",
      }}
      onClick={(e) => {
        onClick();
        e.target.blur();
      }}
    >
      <b>{children}</b>
    </Button>
  );

  return (
    <BSNavbar
      className="px-4"
      style={{
        height: NAV_HEIGHT,
        background: "linear-gradient(rgb(30, 40, 70), #252525)",
        borderBottom: "1px solid black",
        color: "white",
      }}
    >
      <Nav className="me-auto">
        <h4 className="my-auto me-3">Name:</h4>
        <h2
          className="py-1 pe-4 me-4 my-auto"
          style={{
            textAlign: "center",
            cursor: "pointer",
            borderRight: "1px dotted white",
          }}
          onClick={onNameClick}
        >
          <b>{UI.projectName}</b>
        </h2>
        <ModalButton
          modal="newSong"
          variant="primary"
          onClick={() => UI.Modals.show("newSong")}
        >
          New Song
        </ModalButton>
        <ModalButton
          modal="saveJSON"
          variant="success"
          onClick={() => UI.Modals.show("saveJSON")}
        >
          Export to File
        </ModalButton>
        <ModalButton
          modal="loadJSON"
          variant="warning"
          onClick={() => UI.readFiles()}
        >
          Load from File
        </ModalButton>
      </Nav>
      <div>
        <div className="d-inline-block" style={{ verticalAlign: "middle" }}>
          <b>Tempo:</b>
        </div>
        <div
          className="d-inline-block mx-3"
          style={{ verticalAlign: "middle" }}
        >
          <RangeSlider
            variant="light"
            value={Math.round(UI.tempo)}
            tooltipLabel={(val) => `${val}BPM`}
            onChange={(e) => UI.setTempo(e.target.value)}
            min={MIN_TEMPO}
            max={MAX_TEMPO}
            step={1}
          />
        </div>
      </div>
      <Button
        className="mx-2 p-0"
        style={{
          border: "1px solid black",
          borderRadius: "100%",
          width: "40px",
          height: "40px",
          fontSize: "20px",
        }}
        variant="light"
        onClick={() => UI.Modals.show("shortcuts")}
      >
        <b>?</b>
      </Button>
    </BSNavbar>
  );
}
