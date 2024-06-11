import { createContext, useContext, useReducer } from "react";

const NotesContext = createContext(null);
const NoteDispatchFunction = createContext(null);


function notesReducer(notes, action) {
    switch (action.type) {
      case "add": {
        return [...notes, action.payload];
      }
      case "delete": {
        return notes.filter((s) => s.id !== action.payload);
      }
      case "complete": {
        return notes.map((note) =>
          note.id === action.payload
            ? { ...note, completed: !note.completed }
            : note
        );
      }
      default:
        throw Error("unknow error" + action.type);
    }
  }




export function NotesProvider({ children }) {
  const [notes, dispatch] = useReducer(notesReducer, []);

  return (
    <NotesContext.Provider value={notes}>
      <NoteDispatchFunction.Provider value={dispatch}>
        {children}
      </NoteDispatchFunction.Provider>
    </NotesContext.Provider>
  );
}

export function useNotes() {
  return useContext(NotesContext);
}
export function useNotesDispatch() {
    return useContext(NoteDispatchFunction);
  }
  