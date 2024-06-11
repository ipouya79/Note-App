import { useNotes } from "../context/NotesContext";
import Message from "./Message";

function NoteStatus() {
  const notes = useNotes();

  //drived state: do not create new state and use prev states data
  const allNotes = notes.length;
  const completedNotes = notes.filter((n) => n.completed).length;
  const unCompletedNotes = allNotes - completedNotes;

  if (!allNotes)
    return (
      <Message>
        🔴
        <span>No Notes has already been added.</span>
        <span></span>
      </Message>
    );

  return (
    <ul className="note-status">
      <li>
        All <span>{allNotes}</span>
      </li>

      <li>
        Completed <span>{completedNotes}</span>
      </li>

      <li>
        opened <span>{unCompletedNotes}</span>
      </li>
    </ul>
  );
}

export default NoteStatus;
