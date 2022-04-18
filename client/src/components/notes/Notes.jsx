import React from "react";
import Masonry from "react-masonry-css";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import Note from "./Note";
import AddNote from "./AddNote";

import { setCurrent, updateNote, deleteNote } from "../../actions/noteActions";

const Notes = ({ notes, setCurrent, updateNote, deleteNote, labels }) => {
  const breakpointColumnsObj = {
    default: 4,
    1500: 3,
    1050: 2,
    850: 1,
    650: 2,
    500: 1,
  };

  const onDelete = (id) => {
    deleteNote(id);
  };

  return (
    <div className='mb-10 overflow-y-auto overflow-x-hidden h-full w-full flex flex-col items-center pb-10'>
      <AddNote />
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className='my-masonry-grid mt-6'
        columnClassName='my-masonry-grid_column'
      >
        {notes.length === 0 && (
          <p className='mt-5 text-center font-medium'>🙄 Nothing to show</p>
        )}
        {notes.map((note) => {
          return (
            <Note
              key={note._id}
              // onClick={onClick}
              setCurrent={setCurrent}
              updateNote={updateNote}
              note={note}
              onDelete={onDelete}
              labels={labels}
            />
          );
        })}
      </Masonry>
    </div>
  );
};

Notes.propTypes = {
  setCurrent: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  updateNote: PropTypes.func.isRequired,
  notes: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  labels: state.labels,
});

export default connect(mapStateToProps, { setCurrent, updateNote, deleteNote })(
  Notes
);
