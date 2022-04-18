import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { useClickOutside } from "../../hooks";
import { clearCurrent, updateNote } from "../../actions/noteActions";

const EditNote = ({ current, labels, clearCurrent, updateNote }) => {
  const [open, setOpen] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
    label: "",
  });

  const [changed, setChanged] = useState(false);

  const editBox = useRef();
  const cancelButtonRef = useRef(null);

  useClickOutside(editBox, () => console.log("outsiii"));

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
    setChanged(true);
  };

  useEffect(() => {
    if (open) clearCurrent();
    if (!open && changed) {
      updateNote(note);
    }
    // eslint-disable-next-line
  }, [open]);

  useEffect(() => {
    if (current != null) {
      setNote(current);
      setOpen(true);
    }
  }, [current]);

  if (!open) return <></>;

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className='fixed z-10 inset-0 overflow-y-auto'
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-[#202124] bg-opacity-75 transition-opacity' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-75'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-75'
          >
            <div
              className='overflow-auto min-h-[200px] max-h-[90h] relative border border-gray-500 text-gray-200 font-medium inline-block bg-[#202124] rounded-lg text-left shadow-xl transform transition-all sm:my-8 align-middle w-[500px] '
              style={{ boxShadow: "1px 1px 10px #000" }}
              ref={editBox}
            >
              <div className='pl-4'>
                <input
                  className='bg-inherit outline-none 1w-full py-3 font-semibold text-base'
                  onChange={onChange}
                  value={note.title}
                  name='title'
                  placeholder='Title'
                ></input>
                {/* <div className='border border-red-400'></div> */}
                <textarea
                  name='content'
                  onChange={onChange}
                  value={note.content}
                  placeholder='note'
                  // min-h-[200px] max-h-[90h]
                  className='pb-5 resize-none min-h-[200px] max-h-[90h] w-full bg-inherit whitespace-pre  outline-none text-sm font-medium'
                ></textarea>
              </div>
              <div className='mx-2 relative p-2 '>
                {/* <button className='text-xs flex items-center w-20 font-medium hover:opacity-70'>
                  <AiOutlinePlus />
                  <span> Add Label</span>
                </button> */}
                <select
                  className='text-xs font-medium bg-[#202124] w-20'
                  name='label'
                  id='label'
                  onChange={onChange}
                  value={note.label}
                >
                  {labels.length === 0 ? (
                    <option value=''>Add label on sidebar</option>
                  ) : (
                    <option value=''>Add Label</option>
                  )}
                  {labels.map((label, index) => {
                    return (
                      <option key={index} value={label}>
                        {label}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const mapStateToProps = (state) => ({
  current: state.notes.current,
  labels: state.labels,
});

EditNote.propTypes = {
  current: PropTypes.object,
  labels: PropTypes.array.isRequired,
  clearCurrent: PropTypes.func.isRequired,
  updateNote: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { clearCurrent, updateNote })(EditNote);
