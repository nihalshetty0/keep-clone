import React, { useState, useRef } from "react";

import { BiDotsVerticalRounded } from "react-icons/bi";

import { useClickOutside } from "../../hooks";
import { useEffect } from "react";

const Note = ({ setCurrent, updateNote, onDelete, note, labels }) => {
  const optionRef = useRef();

  const [showOptions, setShowOptions] = useState(0);
  const [checked, setChecked] = useState(false);

  useClickOutside(optionRef, () => {
    setShowOptions(false);
  });

  const onLabelChange = (e) => {
    setChecked(e.target.id);
    updateNote({
      ...note,
      label: e.target.id,
    });
  };

  useEffect(() => {
    setChecked(note.label);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div
        className='note mb-30'
        key={note._id}
        onClick={() => {
          setCurrent(note);
        }}
      >
        <h1 className='title'>{note.title}</h1>
        <p className='content mb-8'>{note.content}</p>
        <div className='option-container'>
          <BiDotsVerticalRounded
            className='option-icon'
            onClick={(e) => {
              e.stopPropagation();
              setShowOptions(true);
            }}
          />
          {showOptions > 0 && (
            <>
              <div
                className='option-content'
                ref={optionRef}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {/* {labels.length > 0 && <div>Label note</div>} */}
                {labels.map((label, index) => {
                  return (
                    <div key={index}>
                      <input
                        checked={checked === label}
                        type='radio'
                        name='label'
                        onChange={onLabelChange}
                        id={label}
                      />
                      <label className='ml-1' htmlFor={label}>
                        {label}
                      </label>
                    </div>
                  );
                })}
                <div
                  onClick={() => {
                    onDelete(note._id);
                  }}
                >
                  Delete
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Note;
