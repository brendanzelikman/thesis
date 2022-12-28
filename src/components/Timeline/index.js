import { Button } from "react-bootstrap";
import { useContext } from "react";
import SavePresetModal from "../Modals/SavePreset";
import { UIContext } from "../UIProvider";
// import RangeSlider from "react-bootstrap-range-slider";

export default function Timeline() {
  const UI = useContext(UIContext);

  return (
    <div
      style={{
        filter: UI.playing ? "drop-shadow(0px 0px 8px chartreuse)" : undefined,
      }}
    >
      <h4
        className="py-2 m-0"
        style={{
          background: "linear-gradient(#242424, #363636)",
          color: "white",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
        }}
      >
        <b>Timeline</b>
      </h4>
      <div id="score" style={{ backgroundColor: "whitesmoke" }}></div>
      <div
        className="p-3"
        style={{
          backgroundColor: "lavender",
          border: "1px solid black",
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
        }}
      >
        <Button
          style={{ width: "130px" }}
          className="mx-2"
          variant="dark"
          onClick={() => UI.addRestToTimeline()}
          size="sm"
        >
          Add Rest
        </Button>
        <Button
          style={{ width: "130px" }}
          className="mx-2"
          variant="dark"
          onClick={() => UI.clearTimeline()}
          size="sm"
        >
          Clear Timeline
        </Button>
        <Button
          className="mx-2"
          variant="dark"
          style={{ width: "130px" }}
          onClick={() => UI.Modals.show("savePreset")}
          disabled={UI.key === ";"}
          size="sm"
        >
          Save Preset
        </Button>
      </div>
    </div>
  );
}
