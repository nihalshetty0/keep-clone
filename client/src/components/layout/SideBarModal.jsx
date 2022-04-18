import React, { useEffect } from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import SideBar from "./SideBar";
import PropTypes from "prop-types";

const SideBarModal = ({ open, setOpen }) => {
  useEffect(() => {
    window.addEventListener("resize", () => {});
  });

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className='fixed z-10 inset-0 overflow-y-auto text-gray-200'
        onClose={setOpen}
      >
        <div className='flex text-center h-full' onClick={() => setOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity' />
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
            enterFrom='opacity-0 -translate-x-4 '
            enterTo='opacity-100 translate-x-0 '
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-x-0'
            leaveTo='opacity-0 -translate-x-4 '
          >
            <div className='h-full w-[85%] max-w-[320px] relative inline-block align-bottom bg-[#202124] text-left overflow-hidden shadow-xl transform transition-all  m-0'>
              <SideBar />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

SideBarModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default SideBarModal;
