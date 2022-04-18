import React, { useState, useEffect, useRef } from "react";
import { MdLabel, MdDelete } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { TiTick } from "react-icons/ti";

import PropTypes from "prop-types";

import { connect } from "react-redux";
import { getLabels, setLabels, deleteLabel } from "../../actions/labelAction";
import { getLabel, getNotes } from "../../actions/noteActions";

const SideBar = ({
  labels,
  getLabels,
  getLabel,
  setLabels,
  getNotes,
  deleteLabel,
}) => {
  const [activeLabel, setActiveLabel] = useState("");

  const newLabel = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    setLabels({ name: newLabel.current.value });
    newLabel.current.value = "";
  };

  const onClick = (e) => {
    setActiveLabel(e.currentTarget.getAttribute("data-label"));
    if (e.currentTarget.getAttribute("data-label") === "none") getNotes();
    else {
      getLabel(e.currentTarget.getAttribute("data-label"));
    }
  };

  const onDelete = (e, name) => {
    e.stopPropagation();
    deleteLabel(name);
  };

  useEffect(() => {
    getLabels();
    setActiveLabel("none");
    // eslint-disable-next-line
  }, []);

  return (
    <div className='flex flex-col my-4 min-w-[240px] overflow-auto mb-10'>
      <div
        className={`labels ${activeLabel === "none" ? "label-active" : ""}`}
        onClick={onClick}
        data-label={"none"}
      >
        <span className='flex items-center'>
          <MdLabel />
          <p className='ml-2'>All Notes</p>
        </span>
      </div>
      {labels.length > 0 &&
        labels.map((label, index) => {
          return (
            <div
              className={`labels ${
                activeLabel === label ? "label-active" : ""
              }`}
              key={index}
              onClick={onClick}
              data-label={label}
            >
              <span className='flex items-center '>
                <MdLabel className='label-icon' />
                <MdDelete
                  className='label-delete hidden'
                  onClick={(e) => onDelete(e, label)}
                />
                <p className='ml-2'>{label}</p>
              </span>
            </div>
          );
        })}
      <div className='labels '>
        <form className='flex items-center' onSubmit={onSubmit}>
          <AiOutlinePlus />
          <input
            ref={newLabel}
            type='text'
            className='mx-2 bg-inherit outline-none grow'
            placeholder='Add label'
          />
          <button type='submit'>
            <TiTick />
          </button>
        </form>
      </div>
    </div>
  );
};

SideBar.propTypes = {
  setLabels: PropTypes.func.isRequired,
  getLabels: PropTypes.func.isRequired,
  getLabel: PropTypes.func.isRequired,
  getNotes: PropTypes.func.isRequired,
  deleteLabel: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  labels: state.labels,
});
export default connect(mapStateToProps, {
  setLabels,
  getLabels,
  getLabel,
  getNotes,
  deleteLabel,
})(SideBar);
