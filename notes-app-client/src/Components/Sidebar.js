import { DropdownButton, Dropdown} from "react-bootstrap";
import { DragDropContext } from "react-beautiful-dnd";

import Folder from "./Folder";

const Sidebar = ({
  folders,
  onAddFolder,
  onUpdateFolder,
  onDeleteFolder,
  notes,
  setNotes,
  onAddNote,
  onDeleteNote,
  activeNote,
  setActiveNote,
  onAddTag,
  onRemoveTag,
  connectionError
}) => {
  const sortedNotes = notes.sort((a, b) => b.updated_at - a.updated_at)

  // DND HANDLER
  const handleOnDragEnd = (result) => {
    // Return if out of bounds
    if (!result.destination) return;
    const { destination, draggableId } = result;
    // Removed conditionnal logic of organizing notes based on DnD placement 
    // if (source.droppableId !== destination.droppableId) {

      // Update note within notes array with new folder ID
      const updatedNote = {
        folder_id: destination.droppableId,
        updated_at: Date.now()
      }
      const updatedNotesArr = notes.map((note) => {
        if (note.id === draggableId) {
          return ({
            ...note,
            folder_id: destination.droppableId,
            updated_at: Date.now()
          })
        }
        return note;
      });
      fetch(`http://localhost:9292/folders/notes/${draggableId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedNote),
      })
      setNotes(updatedNotesArr);
    // }
  }

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>Notes</h1>
        <DropdownButton id="dropdown-basic-button" title="Add" size="sm">
          <Dropdown.Item onClick={onAddFolder}>Folder</Dropdown.Item>
          <Dropdown.Item>Note (I'm useless lol)</Dropdown.Item>
        </DropdownButton>
      </div>
      {/* Display Connection Error Message */}
      {connectionError ?
        <div className="app-sidebar-error">
          <p style={{text: 'red'}}>{connectionError}</p>
        </div> :
        null
      }
      <div className="app-sidebar-notes">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {/* Folders with Notes */}
        {folders.map((folder, i) => (
              <Folder 
                key={folder.id}
                i={i}
                folder={folder}
                onUpdateFolder={onUpdateFolder}
                onDeleteFolder={onDeleteFolder}
                notes={sortedNotes}
                onAddNote={onAddNote}
                setNotes={setNotes}
                onDeleteNote={onDeleteNote}
                activeNote={activeNote}
                setActiveNote={setActiveNote}
                onAddTag={onAddTag}
                onRemoveTag={onRemoveTag}
              />
        ))}
      </DragDropContext>
      </div>
    </div>
  );
};
  
  export default Sidebar;