import { useEffect, useState } from "react";
import { ContextMenu } from "../Styles/styles";
import { Accordion, Button, Modal } from "react-bootstrap";
import { Droppable, Draggable } from "react-beautiful-dnd";

import Note from "./Note";


const Folder = ({ 
	i,
	folder,
	onUpdateFolder,
	onDeleteFolder,
	notes,
	onDeleteNote,
	activeNote,
	setActiveNote,
	onAddNote,
	onAddTag,
	onRemoveTag
}) => {
	const sortedNotes = notes.sort((a, b) => b.updated_at - a.updated_at)
	// Delete Modal
	const [showModal, setShowModal] = useState(false);
	const handleCloseModal = () => setShowModal(false);
	const handleShowModal = () => setShowModal(true);
	const handleDelete = (e) => {
		e.preventDefault();
		onDeleteFolder(folder.id);
		handleCloseModal();
	}

	// Context Menu
	const [showMenu, setShowMenu] = useState(false);
	const [points, setPoints] = useState({ x: 0, y: 0});

	// Folder Rename Input
	const [showRename, setShowRename] = useState(false);
	const handleShowRename = () => setShowRename(true);
	const handleCloseRename = () => setShowRename(false);

	// Context Menu browser click to hide
	useEffect(() => {
		const handleClick = () => setShowMenu(false);
		window.addEventListener('click', handleClick);
		return () => window.removeEventListener('click', handleClick);
	}, []);

	// Folder Rename Input browser click to hide
	useEffect(() => {
		const handleRenameClick = () => setShowRename(false);
		window.addEventListener('click', handleRenameClick);
		return () => window.removeEventListener('click', handleRenameClick)
	})

  const handleRenameFolder = (e) => {
		const updatedFolder = {
			...folder,
			name: e.target.value,
			updated_at: Date.now()
		}
		onUpdateFolder(e, folder, updatedFolder)
	}

	return (
		<>
		<Accordion defaultActiveKey="0">
		<Accordion.Item>
		{/* Context Menu Div */}
		<div
			onContextMenu={e => {
				e.preventDefault();
				setShowMenu(true);
				setPoints({ x: e.pageX, y: e.pageY });
			}}
		>
			<Accordion.Header>
				{/* Render rename folder input field */}
        {showRename ? 
				<form onSubmit={handleCloseRename}>
					<input autoFocus className="form-control" type="text" onChange={(e) => handleRenameFolder(e)} value={folder.name}></input>
				</form> :
				folder.name
				}
      </Accordion.Header>
		</div>
		{/* Render Context Menu when showMenu is true */}
		{showMenu && (
			<ContextMenu top={points.y} left={points.x}>
				<ul>
					<li onClick={() => onAddNote(folder.id)}>Add File</li>
					<li onClick={handleShowRename}>Rename</li>
					<li onClick={handleShowModal}>Delete</li>
				</ul>
			</ContextMenu>
		)}
			<Droppable key={folder.id} droppableId={folder.id} index={i}>
			{(provided, snapshot) => (
				// Droppable div
				<div 
					ref={provided.innerRef} 
					style={{background: snapshot.isDraggingOver ? 'lightblue' : null}}
					{...provided.droppableProps}
				>
					<Accordion.Body>
						{sortedNotes.map((note, i) => {
							if (note.folder_id === folder.id) {
								return (
									<Draggable key={note.id} draggableId={note.id} index={i}>
										{(provided) => (
											// Draggable div
											<div 
												ref={provided.innerRef} 
												{...provided.draggableProps} 
												{...provided.dragHandleProps}
											>
												<Note
													note={note}
													onDeleteNote={onDeleteNote}
													activeNote={activeNote}
													setActiveNote={setActiveNote}
													onAddTag={onAddTag}
													onRemoveTag={onRemoveTag}
												/>
											</div>
										)}
									</Draggable>
								)
							} else return (null)
						})}
					</Accordion.Body>
					{provided.placeholder}
				</div>
			)}
			</Droppable>
		</Accordion.Item>
		</Accordion>
		
		{/* Delete Modal */}
		<Modal show={showModal} onHide={handleCloseModal}>
			<Modal.Header closeButton>
			<Modal.Title>{folder.name}</Modal.Title>
			</Modal.Header>
			<Modal.Body>Are you sure you want to delete {<b><i>{folder.name}</i></b>} and {<strong>all of its contents?</strong>}</Modal.Body>
			<Modal.Footer>
			<Button variant="secondary" onClick={handleCloseModal}>
					No, I regret everything!
			</Button>
			<Button variant="danger" onClick={(e) => handleDelete(e)}>
					Delete
			</Button>
			</Modal.Footer>
		</Modal>
		</>
	)
}

export default Folder;