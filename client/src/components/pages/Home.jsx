import React, { useState, useEffect } from "react";
import NavBar from "../layout/NavBar";
import SideBar from "../layout/SideBar";
import NoteContainer from "../notes/NoteContainer";
import EditNote from "../notes/EditNote";

import { connect } from "react-redux";

const Home = ({ isAuthenticated }) => {
  const [render, setRender] = useState(false);
  useEffect(() => {
    setRender(true);
  }, [isAuthenticated]);

  return (
    <div className='home'>
      <NavBar />
      {render && (
        <>
          <div className='main'>
            <div className='hidden sm:block'>
              <SideBar />
            </div>
            <NoteContainer />
            <EditNote />
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, {})(Home);
