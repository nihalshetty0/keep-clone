import React, { useState } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addNote } from "../../actions/noteActions";
import { useRef } from "react";

import { useClickOutside } from "../../hooks";

const calcHeight = (value) => {
  let numberOfLineBreaks = (value.match(/\n/g) || []).length;
  let newHeight = 30 + numberOfLineBreaks * 20 + 12 + 2;
  return newHeight;
};

const AddNote = ({ addNote, labels }) => {
  const [note, setNote] = useState({
    title: "",
    content: "",
    label: "",
  });

  const contentRef = useRef();
  const formRef = useRef();

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
    contentRef.current.addEventListener("keyup", () => {
      contentRef.current.style.height =
        calcHeight(contentRef.current.value) + "px";
    });
  };

  const onSubmit = () => {
    if (note.title === "" && note.content === "") {
    } else {
      addNote(note);
      setNote({ title: "", content: "", label: "" });
      if (contentRef.current) contentRef.current.style.height = "40px";
    }
  };

  useClickOutside(formRef, onSubmit);

  return (
    <form
      ref={formRef}
      className='focus:pb-2 relative border border-gray-600 bg-inherit mt-6 rounded-md w-3/5 max-w-lg text-base font-bold addnote'
      style={{ boxShadow: "1px 1px 5px #000" }}
    >
      <input
        onChange={onChange}
        value={note.title}
        type='text'
        name='title'
        className='outline-none bg-inherit p-1.5 px-4 font-semibold w-full text-base'
        placeholder='Title'
      />
      <textarea
        ref={contentRef}
        contentEditable='true'
        value={note.content}
        onChange={onChange}
        suppressContentEditableWarning={true}
        name='content'
        type='text'
        className='break-words p-3 px-4 resize-none whitespace-pre overflow-hidden outline-none text-sm bg-inherit font-medium h-10  w-full textarea'
        placeholder='Take a note...'
      ></textarea>
      <div className='add-note-option hidden'>
        <select
          name='label'
          id='label'
          onChange={onChange}
          value={note.label}
          className=' border-gray-600 m-2 ml-4 rounded-md text-xs font-medium bg-[#202124] w-20'
        >
          <option value=''>Add Label</option>
          {labels.map((label, index) => {
            return (
              <option key={index} value={label}>
                {label}
              </option>
            );
          })}
        </select>
      </div>
    </form>
  );
};

AddNote.propTypes = {
  addNote: PropTypes.func.isRequired,
  labels: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  labels: state.labels,
});

export default connect(mapStateToProps, { addNote })(AddNote);

// https://codepen.io/chriscoyier/pen/XWbqpzP
// https://css-tricks.com/auto-growing-inputs-textareas/
