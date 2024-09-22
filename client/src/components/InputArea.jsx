import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

function InputArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const [isExpanded, setExpanded] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    props.addNote(note);
    setNote({
      title: "",
      content: "",
    });
    setExpanded(false);
    event.preventDefault();
  }
  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note" onSubmit={submitNote}>
        {/** OnSubmit means when you press enter it submits the note instead of refreshing. Feels natural this way */}
        {isExpanded && (
          <input
            onClick={expand}
            onChange={handleChange}
            name="title"
            placeholder="Title"
            value={note.title}
          />
        )}
        <textarea
          onClick={expand}
          onChange={handleChange}
          name="content"
          placeholder="Take a note"
          value={note.content}
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab className="addButton" onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default InputArea;

{
}
