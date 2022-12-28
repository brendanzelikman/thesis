import { useContext } from "react";
import { UIContext } from "../UIProvider";
import Node from "../Node";

export default function Nodes() {
  const UI = useContext(UIContext);
  const nodes = UI.getNodes();

  return nodes.length ? (
    <div className="my-4 px-3">
      {nodes.map((_, depth) => (
        <Node key={depth} depth={depth} />
      ))}
    </div>
  ) : null;
}
