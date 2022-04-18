import React, { useEffect } from "react";
import Notes from "./Notes";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getNotes } from "../../actions/noteActions";

const NoteContainer = ({ notes, getNotes }) => {
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='grow flex flex-col justify-start items-center '>
      {notes.notes && <Notes notes={notes.notes} />}
    </div>
  );
};

NoteContainer.propTypes = {
  getNotes: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  notes: state.notes,
});

export default connect(mapStateToProps, { getNotes })(NoteContainer);
