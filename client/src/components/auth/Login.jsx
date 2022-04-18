import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/authActions";
import { loadUser } from "../../actions/authActions";
import { clearError } from "../../actions/authActions";
import { setAlert } from "../../actions/alertAction";

import NavBar from "../layout/NavBar";

const Login = ({ auth, login, setAlert, loadUser, clearError }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;
  const { error, isAuthenticated } = auth;

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && localStorage.token) {
      loadUser();
    }
    if (isAuthenticated) {
      navigate("/");
    }

    if (error === "Invalid credentials") {
      setAlert("Invalid credentials");
      clearError();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const fillFields = (e) => {
    e.stopPropagation();
    setUser({ email: "madewith@react.com", password: "KxAKgJAKTRzxv8d" });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Enter all fields");
    } else login({ email, password });
  };

  return (
    <>
      <NavBar />
      <div className='flex justify-center items-center h-[85%]'>
        <form
          onSubmit={onSubmit}
          className='auth-card flex flex-col items-center justify border border-gray-500 w-[350px] rounded-xl p-10 py-6'
          style={{ boxShadow: "1px 1px 10px #000" }}
        >
          <h1 className='text-3xl mb-4 font-semibold'>Login</h1>
          <input
            onChange={onChange}
            type='email'
            name='email'
            id=''
            placeholder='Email'
            value={user.email}
          />
          <input
            onChange={onChange}
            type='password'
            name='password'
            id=''
            placeholder='Password'
            value={user.password}
          />

          <input
            type='submit'
            value='Login'
            className='submitBtn'
            tabIndex='1'
          />
          <Link to='/register' className='underline'>
            No account? Register
          </Link>
          <button
            className='mt-3 text-xs bg-[#ffbb0066] p-1 rounded-xl px-2 animate-bounce'
            onClick={fillFields}
          >
            Get demo account
          </button>
        </form>
      </div>
    </>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  login,
  setAlert,
  loadUser,
  clearError,
})(Login);
