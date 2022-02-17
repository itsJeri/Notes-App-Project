import { useEffect, useState } from "react";
import { ContextMenu } from "../Styles/styles";
import { Modal, Button, Badge } from "react-bootstrap";

const Note = ({ 
	note, 
	onDeleteNote, 
	activeNote, 
	setActiveNote,
	onAddTag,
	onRemoveTag
}) => {
	// Delete Modal
	const [showModal, setShowModal] = useState(false);
	const handleCloseModal = () => setShowModal(false);
	const handleShowModal = () => setShowModal(true);
	const handleDelete = () => {
		onDeleteNote(note.id)
		handleCloseModal()
	}

	// Tags Modal
	const [tagForm, setTagForm] = useState("");
	const [showTagsModal, setShowTagsModal] = useState(false);
	const handleCloseTagsModal = () => {
		setShowTagsModal(false);
		setTagForm("");
	}
	const handleShowTagsModal = () => setShowTagsModal(true);
	const handleTagAdd = (e) => {
		e.preventDefault();
		setTagForm("");
		onAddTag(note, tagForm.toLowerCase());
	}
	const handleTagRemove = (e) => {
		const removedTag = note.tags.find(tag => tag.id === e.target.id)
		onRemoveTag(note, removedTag)
	}

	const noteTags = note.tags.map(tag => tag)
	const tagsExist = !!note.tags.find(tag => tag)

	// Context Menu
	const [showMenu, setShowMenu] = useState(false);
	const [points, setPoints] = useState({ x: 0, y: 0});

	// Context Menu browser click to hide
	useEffect(() => {
		const handleClick = () => setShowMenu(false);
		window.addEventListener('click', handleClick);
		return () => window.removeEventListener('click', handleClick);
	}, []);
    
	return (
		<div>
			{/* Context Menu Div */}
			<div
				onContextMenu={e => {
					e.preventDefault();
					setShowMenu(true);
					setPoints({ x: e.pageX, y: e.pageY });
				}}
			>
			<div
				className={`app-sidebar-note ${note.id === activeNote && "active"}`}
				onClick={() => setActiveNote(note.id)}
			>

			<div className="sidebar-note-title">
				<div>
					<strong>{note.title}</strong>
					{/* Sidebar Tags */}
					{noteTags.map(({id, name}) => (
          	<Badge 
							key={id} 
							bg="info" 
							className="position-relative" 
							style={{
								marginLeft: '5px', 
								top: '-2px'
							}}
						>
							{name}
						</Badge>
        	))}
				</div>
				<button onClick={handleShowModal}>
					🗑️
				</button>
				</div>

				<p style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{note.body}</p>
				<small className="note-meta">
					Last Modified{" "}
					{new Date(note.updated_at).toLocaleDateString("en-GB", {
						hour: "2-digit",
						minute: "2-digit",
					})}
				</small>
			</div>
			</div>
			{/* Render Context Menu when showMenu is true */}
			{showMenu && (
				<ContextMenu top={points.y} left={points.x}>
					<ul>
						<li onClick={handleShowTagsModal}>Manage Tags</li>
						<li onClick={handleShowModal}>Delete</li>
					</ul>
				</ContextMenu>
			)}
			{/* Delete Modal */}
			<Modal show={showModal} onHide={handleCloseModal}>
				<Modal.Header closeButton>
				<Modal.Title>{note.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>Are you sure you want to delete {<b><i>{note.title}</i></b>}?</Modal.Body>
				<Modal.Footer>
				<Button variant="secondary" onClick={handleCloseModal}>
						No, take me back!
				</Button>
				<Button variant="danger" onClick={handleDelete}>
						Delete
				</Button>
				</Modal.Footer>
			</Modal>

			{/* Tags Modal */}
			<Modal show={showTagsModal} onHide={handleCloseTagsModal}>
				<Modal.Header closeButton>
				<Modal.Title>Tags in {note.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{/* Tags */}
					{tagsExist ?
					noteTags.map(({id, name}) => (
          	<Badge 
							key={id} 
							id={id} 
							bg="info" 
							className="position-relative" 
							style={{
								marginRight: '5px', 
								marginBottom: '10px',
								marginTop: '10px',
								bottom: '7px'
							}} 
							as="button" 
							onClick={(e) => handleTagRemove(e)}
						>
							{name} X
						</Badge>
        	)) :
					<p><i>No tags</i></p>
					}
					<form onSubmit={(e) => handleTagAdd(e)}>
						<input type="text" placeholder="New Tags" value={tagForm} onChange={(e) => setTagForm(e.target.value)}/>
					</form>
				</Modal.Body>
				<Modal.Footer>
				<Button variant="primary" onClick={handleCloseTagsModal}>
						Done
				</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}

export default Note;