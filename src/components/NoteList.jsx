import { useNotes, useNotesDispatch } from "../context/NotesContext";

function NoteList({ sortBy }) {
  const notes = useNotes();

  let soretedNotes = notes;

  if (sortBy === "earliest")
    soretedNotes = [...notes].sort(
      (a, b) => new Date(a.createAt) - new Date(b.createAt)
    ); // a - b => a > b ? 1 : -1

  if (sortBy === "latest")
    soretedNotes = [...notes].sort(
      (a, b) => new Date(b.createAt) - new Date(a.createAt)
    ); // b - b => a > b ? -1 : 1

  if (sortBy === "completed")
    soretedNotes = [...notes].sort(
      (a, b) => Number(a.completed) - Number(b.completed)
    ); // use 0 - 1 instead true false

  console.log(notes);
  return (
    <div className="note-list">
      {soretedNotes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </div>
  );
}

export default NoteList;

function NoteItem({ note }) {
  const dispatch = useNotesDispatch();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div className={`note-item ${note.completed ? "completed" : ""}`}>
      <div className="note-item__header">
        <div>
          <p className="title">{note.title}</p>
          <p className="desc">{note.description}</p>
        </div>
        <div className="actions">
          <button
            onClick={() => dispatch({ type: "delete", payload: note.id })}
          >
            ❌
          </button>
          <input
            type="checkbox"
            name={note.id}
            id={note.id}
            value={note.id}
            onChange={(e) => {
              const noteId = Number(e.target.value);
              dispatch({ type: "complete", payload: noteId });
            }}
          />
        </div>
      </div>
      <div className="note-item__footer">
        {new Date(note.createAt).toLocaleString("en-US", options)}
      </div>
    </div>
  );
}
