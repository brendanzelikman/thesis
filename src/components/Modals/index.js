import AddNoteModal from "./AddNote";
import AddPartModal from "./AddPart";
import BigTransposeModal from "./BigTranspose";
import EditNameModal from "./EditName";
import EditPartModal from "./EditPart";
import EditTempoModal from "./EditTempo";
import LittleTransposeModal from "./LittleTranspose";
import RemoveNoteModal from "./RemoveNote";
import RemovePartModal from "./RemovePart";
import SavePresetModal from "./SavePreset";
import LoadPresetModal from "./LoadPreset";
import NewSongModal from "./NewSong";
import SaveJSONModal from "./SaveJSON";
import ShortcutsModal from "./Shortcuts";

const Modals = () => (
  <>
    <AddNoteModal />
    <AddPartModal />
    <BigTransposeModal />
    <EditNameModal />
    <EditPartModal />
    <EditTempoModal />
    <LittleTransposeModal />
    <LoadPresetModal />
    <NewSongModal />
    <RemoveNoteModal />
    <RemovePartModal />
    <SaveJSONModal />
    <SavePresetModal />
    <ShortcutsModal />
  </>
);

export default Modals;
