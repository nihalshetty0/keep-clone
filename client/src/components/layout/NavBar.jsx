import React, { useState, useRef } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { IoMdClose, IoIosLogOut } from "react-icons/io";
import SideBarModal from "./SideBarModal";

import { useClickOutside } from "../../hooks";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logout } from "../../actions/authActions";

import { searchNotes } from "../../actions/noteActions";
import { useEffect } from "react";

const NavBar = ({ auth, alerts, searchNotes, logout }) => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [bufferShow, setBufferShow] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef();

  const onChange = (e) => {
    setQuery(e.target.value);
    searchNotes(e.target.value);
  };

  const clearQuery = () => {
    setQuery("");
    setShowSearchBar(false);
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setShowSearchBar(false);
    });
  }, []);

  useClickOutside(searchRef, () => {
    if (!bufferShow) setShowSearchBar(false);
    setBufferShow(false);
  });
  return (
    <>
      <div className='flex p-1 relative justify-between items-center h-16 px-4 text-2xl border-b border-gray-600'>
        {!auth.isAuthenticated ? (
          <Logo
            setShowSideBar={setShowSideBar}
            isAuthenticated={auth.isAuthenticated}
          />
        ) : (
          <>
            {!showSearchBar ? (
              <Logo
                setShowSideBar={setShowSideBar}
                isAuthenticated={auth.isAuthenticated}
              />
            ) : (
              <div className=' w-4/5' ref={searchRef}>
                <form className='searchBar flex transition-colors duration-150 ease-in-out  items-center px-3 text-gray-500 text-xl bg-gray-200 rounded-md max-w-lg '>
                  <BiSearch className='cursor-pointer' />
                  {/* <form onSubmit={onSubmit}> */}
                  <input
                    value={query}
                    onChange={onChange}
                    type='text'
                    className='grow flex text-base mx-0 transition-colors duration-150 ease-in-out h-11 outline-none text-black bg-gray-200'
                  />
                  <IoMdClose onClick={clearQuery} className='cursor-pointer' />
                </form>
              </div>
            )}

            <form className='searchBar hidden sm:flex transition-colors duration-150 ease-in-out items-center justify-around px-3 bg-[#525356] focus-within:text-gray-500 text-xl focus-within:bg-gray-200 rounded-md w-3/5 max-w-lg '>
              <BiSearch className='cursor-pointer ' />
              {/* <form onSubmit={onSubmit}> */}
              <input
                value={query}
                onChange={onChange}
                type='text'
                className='hidden grow sm:flex text-base mx-0 transition-colors duration-150 ease-in-out bg-[#525356] h-11 outline-none p-4 focus:text-black focus:bg-gray-200 '
              />
              {query.length > 0 && (
                <IoMdClose onClick={clearQuery} className='cursor-pointer' />
              )}
            </form>
            <div className='nav-right flex items-center'>
              <div className='block sm:hidden'>
                <BiSearch
                  // ref={searchTrigger}
                  className='mr-3 cursor-pointer'
                  onClick={() => {
                    setShowSearchBar(true);
                    setBufferShow(true);
                  }}
                />
              </div>
              <div className='cursor-pointer ' onClick={logout}>
                <IoIosLogOut className='cursor-pointer' />
              </div>
            </div>
            <SideBarModal open={showSideBar} setOpen={setShowSideBar} />
          </>
        )}

        <div
          className='alert flex flex-col absolute bottom-10 '
          style={{
            left: "50%",
            top: "80px",
            transform: "translate(-50%)",
          }}
        >
          {alerts.map((alert) => {
            return (
              <div
                key={alert.id}
                className='mb-3 p-2 rounded-md bg-red-700 text-base'
              >
                {alert.msg}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

NavBar.propTypes = {
  searchNotes: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  alerts: state.alert,
});

export default connect(mapStateToProps, { searchNotes, logout })(NavBar);

const Logo = ({ setShowSideBar, isAuthenticated }) => {
  return (
    <div className='nav-left m-2 flex items-center'>
      <a
        href='#!'
        className='text-gray-200 cursor-pointer'
        onClick={() => {
          setShowSideBar(true);
        }}
      >
        {isAuthenticated && <HiOutlineMenu className='flex sm:hidden' />}
      </a>
      <p className='font-semibold whitespace-nowrap cursor-pointer'>
        <span>📒</span> Keep
      </p>
    </div>
  );
};
