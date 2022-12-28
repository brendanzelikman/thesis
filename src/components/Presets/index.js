import { Accordion, Table } from "react-bootstrap";
import { useContext } from "react";
import { UIContext } from "../UIProvider";
import { PRESETS } from "../../presets";

export default function Presets() {
  const UI = useContext(UIContext);

  const createPreset = ({ name = "", system = "", timeline = "" }) => {
    return (
      <tr
        key={name}
        className="hover-gray"
        onClick={() => UI.loadKey(`${system};${timeline}`)}
        style={{ cursor: "pointer" }}
      >
        <td>{name}</td>
      </tr>
    );
  };
  const createCustomPreset = (preset, i) => {
    let title, key;
    const splitIndex = preset.indexOf("_");
    if (splitIndex < 0) {
      title = `Preset ${i + 1}`;
      key = preset;
    } else {
      title = preset.slice(0, splitIndex);
      key = preset.slice(splitIndex + 1, preset.length);
    }
    const onPresetClick = (e) => {
      e.preventDefault();
      UI.loadKey(key);
      UI.Modals.setTag("renamePreset", i);
      if (e.detail == 2) UI.Modals.show("renamePreset");
    };
    return (
      <tr key={i}>
        <th>{i}</th>
        <td onClick={onPresetClick}>{title}</td>
        <td onClick={() => UI.removePreset(i + 1)}>
          <a href="" onClick={(e) => e.preventDefault()}>
            Remove
          </a>
        </td>
      </tr>
    );
  };

  const PresetButton = ({ children }) => (
    <div
      className="my-3 mx-2"
      style={{
        border: "2px solid black",
        overflow: "hidden",
        borderRadius: "20px",
        backgroundColor: "white",
      }}
    >
      {children}
    </div>
  );

  const PresetTable = ({ presets }) => (
    <Table className="w-100 m-0" bordered>
      <tbody>{presets.map(createPreset)}</tbody>
    </Table>
  );

  const CustomPresetTable = ({ presets }) => (
    <Table className="w-100 m-0" bordered className="hover-gray">
      <tbody>{presets.map((preset, i) => createCustomPreset(preset, i))}</tbody>
    </Table>
  );

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
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
        }}
      >
        <b>Presets</b>
      </h4>
      <Accordion className="pt-3 px-3" style={{ overflow: "hidden" }}>
        <Accordion.Item eventKey="0" as={PresetButton}>
          <Accordion.Header>
            <h5>Basic Scales</h5>
          </Accordion.Header>
          <Accordion.Body className="w-100 p-0">
            <PresetTable presets={PRESETS.basicScales} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1" as={PresetButton}>
          <Accordion.Header>
            <h5>Uncommon Scales</h5>
          </Accordion.Header>
          <Accordion.Body className="w-100 p-0">
            <PresetTable presets={PRESETS.uncommonScales} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2" as={PresetButton}>
          <Accordion.Header>
            <h5>Modes</h5>
          </Accordion.Header>
          <Accordion.Body className="w-100 p-0">
            <PresetTable presets={PRESETS.modes} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3" as={PresetButton}>
          <Accordion.Header>
            <h5>Chords</h5>
          </Accordion.Header>
          <Accordion.Body className="w-100 p-0">
            <PresetTable presets={PRESETS.chords} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4" as={PresetButton}>
          <Accordion.Header>
            <h5>Rhythms</h5>
          </Accordion.Header>
          <Accordion.Body className="w-100 p-0">
            <PresetTable presets={PRESETS.rhythms} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5" as={PresetButton}>
          <Accordion.Header>
            <h5>Custom Presets</h5>
          </Accordion.Header>
          <Accordion.Body className="w-100 p-0">
            <CustomPresetTable presets={UI.customPresets} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
