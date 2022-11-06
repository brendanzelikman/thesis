import { Container, Row, Col } from "react-bootstrap";
import useDynamicTimeline from "./hooks/useDynamicTimeline";
import useSystemManager from "./hooks/useSystemManager";
import useEventListeners from "./hooks/useEventListeners";
import useSynthPattern from "./hooks/useSynthPattern";
import TimelineView from "./components/Timeline";
import Presets from "./components/Presets";
import Parts from "./components/Parts";
import useModalManager from "./hooks/useModalManager";
import { UIProvider } from "./components/UIProvider";
import Nodes from "./components/Nodes";
import Navbar, { NAV_HEIGHT } from "./components/Navbar";
import Modals from "./components/Modals";

export default function App() {
  const Manager = useSystemManager();
  const UI = useModalManager(Manager);
  useEventListeners(UI);
  useSynthPattern(UI);
  useDynamicTimeline(UI);

  return (
    <UIProvider value={UI}>
      <Container className="h-100 p-0 text-center fade-in" id="App" fluid>
        <Navbar />
        <Modals />
        <Row
          className="w-100 m-0 p-3"
          style={{ height: `calc(100% - ${NAV_HEIGHT}px)` }}
        >
          <Col lg={6} xl={3} className="p-3">
            <Parts />
          </Col>
          <Col lg={6} xl={6} className="p-3">
            <TimelineView />
            <Nodes />
          </Col>
          <Col lg={12} xl={3} className="p-3">
            <Presets />
          </Col>
        </Row>
      </Container>
    </UIProvider>
  );
}
