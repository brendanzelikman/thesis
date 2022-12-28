import { Button, Row, Col } from "react-bootstrap";
import { useState, useContext } from "react";
import { UIContext } from "../UIProvider";
import RangeSlider from "react-bootstrap-range-slider";
import { MIN_VOLUME, MAX_VOLUME } from "../../util";

export default function Parts() {
  const UI = useContext(UIContext);

  const onPartClick = (i) => (e) => {
    e.preventDefault();
    UI.setActivePart(i);
    UI.Modals.setTag("editPart", i);
    if (e.detail === 2) UI.Modals.show("editPart");
  };

  return (
    <div
      style={{
        borderRadius: "20px",
        minWidth: "300px",
        minHeight: "100%",
        background: "linear-gradient(whitesmoke, #ccc)",
        border: "1px solid black",
      }}
    >
      <h4
        className="py-2 m-0"
        style={{
          background: "linear-gradient(#242424, #363636)",
          color: "white",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
        }}
      >
        <b>Parts</b>
      </h4>
      <div className="mt-4 pt-2 pb-2 px-3">
        {UI.parts.map((part, i) => {
          const active = UI.activePart === i;
          return (
            <Row
              className="px-3 py-0 mb-3"
              key={i}
              style={{
                backgroundColor: active ? "#343434" : "whitesmoke",
                borderRadius: "20px",
                width: "calc(100% - 20px)",
                color: active ? "white" : "black",
                border: "2px solid black",
                whiteSpace: "nowrap",
                margin: "0 auto",
                minHeight: "80px",
              }}
            >
              <Col
                sm={1}
                className="my-auto p-0"
                style={{ borderRight: "1px dotted black" }}
              >
                <h3 style={{ float: "left" }}>{i + 1}</h3>
              </Col>
              <Col lg={8} md={10} className="my-auto px-2 py-0">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h5
                    className="me-auto"
                    style={{ cursor: "pointer" }}
                    onClick={onPartClick(i)}
                  >
                    {part.name || `Part ${i + 1}`}
                  </h5>
                  <RangeSlider
                    size="sm"
                    min={MIN_VOLUME}
                    max={MAX_VOLUME}
                    step={1}
                    tooltipLabel={(val) => `${val}dB`}
                    value={Math.round(part.volume)}
                    onChange={(e) =>
                      UI.updatePart(i, (part) => part.setVolume(e.target.value))
                    }
                  />
                </div>
              </Col>
              <Col className="my-auto p-2" lg={3} md={12}>
                <img
                  onClick={() => UI.togglePart(i)}
                  style={{
                    cursor: "pointer",
                    filter: `${active ? "invert(1)" : "invert(0)"}`,
                  }}
                  width="40"
                  height="40"
                  src={
                    part.playing
                      ? "https://cdn-icons-png.flaticon.com/512/120/120632.png"
                      : "https://cdn-icons-png.flaticon.com/512/109/109197.png"
                  }
                />
              </Col>
              {/* )} */}

              {/* <Button
                className="d-inline-block mx-2 border border-dark"
                variant={active ? "dark" : "light"}
              
                style={{ width: "calc(100% - 100px)" }}
              >
                <h5>{part.name || `Part ${i + 1}`}</h5>
              </Button> */}
            </Row>
          );
        })}
      </div>
      <div>
        <Button
          className="mx-2"
          variant="success"
          style={{ borderRadius: "5px" }}
          onClick={() => UI.Modals.show("addPart")}
        >
          Add Part
        </Button>
        <Button
          className="mx-2"
          variant="danger"
          style={{ borderRadius: "5px" }}
          onClick={() => UI.Modals.show("removePart")}
          disabled={UI.parts.length < 2}
        >
          Remove Part
        </Button>
      </div>
    </div>
  );
}
