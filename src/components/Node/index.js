import { Button, Row, Col } from "react-bootstrap";
import useDynamicScore from "../../hooks/useDynamicScore";
import { useContext } from "react";
import { UIContext } from "../UIProvider";

export default function Node({ depth }) {
  const UI = useContext(UIContext);

  const node = UI.getNodeAtDepth(depth);
  const notes = node.getNotes();

  useDynamicScore({ depth });

  return (
    <div
      className="w-100"
      style={{
        overflow: "hidden",
        borderRadius: "20px",
        borderTopLeftRadius: "20px",
        borderTopRightRadius: "20px",
      }}
      key={depth}
      className="mb-4 mx-auto panel"
    >
      {depth === UI.system.length - 1 && (
        <>
          {!(UI.system.length < 2) ? (
            <Button
              className="mx-3 my-2 p-0"
              variant="danger"
              style={{
                float: "left",
                width: "30px",
                height: "30px",
                borderRadius: "100%",
              }}
              disabled={UI.system.length < 2}
              onClick={() => UI.popNode()}
            >
              -
            </Button>
          ) : null}
          {!!UI.getNotesAtDepth(depth).length ? (
            <Button
              className="mx-3 my-2 p-0"
              variant="success"
              style={{
                float: "right",
                width: "30px",
                height: "30px",
                borderRadius: "100%",
              }}
              onClick={UI.pushNode}
              disabled={!UI.getNotesAtDepth(depth).length}
            >
              +
            </Button>
          ) : null}
        </>
      )}
      <h4
        className="py-2 m-0"
        style={{
          background: "linear-gradient(#303030, #363636)",
          color: "white",
        }}
      >
        <b>Depth {depth + 1}</b>
      </h4>
      <Row className="w-100 p-0 m-0">
        <div id={`score-${depth}`}></div>
        <div
          className="mt-4 py-2"
          style={{ backgroundColor: "lavender", borderTop: "1px solid black" }}
        >
          <Button
            style={{ width: "110px" }}
            className="my-1 mx-2"
            variant="dark"
            onClick={() => {
              UI.Modals.setTag("addNote", depth);
              UI.Modals.show("addNote");
            }}
            size="sm"
          >
            Add Note
          </Button>
          <Button
            style={{ width: "110px" }}
            className="my-1 mx-2"
            variant="dark"
            onClick={() => {
              UI.Modals.setTag("removeNote", depth);
              UI.Modals.show("removeNote");
            }}
            disabled={!notes.length}
            size="sm"
          >
            Remove Note
          </Button>
          <Button
            style={{ width: "110px" }}
            className="my-1 mx-2"
            variant="dark"
            onClick={() => UI.clearNotesAtDepth(depth)}
            size="sm"
          >
            Clear Notes
          </Button>
          <Button
            style={{ width: "110px" }}
            className="my-1 mx-2"
            variant="dark"
            onClick={() => {
              UI.Modals.setTag("bigTranspose", depth);
              UI.Modals.show("bigTranspose");
            }}
            size="sm"
          >
            Transpose
          </Button>
          <Button
            style={{ width: "110px" }}
            className="my-1 mx-2"
            variant="dark"
            onClick={() => {
              UI.Modals.setTag("littleTranspose", depth);
              UI.Modals.show("littleTranspose");
            }}
            size="sm"
          >
            transpose
          </Button>
        </div>
      </Row>
    </div>
  );
}
