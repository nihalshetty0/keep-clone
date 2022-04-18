import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { clearError, register } from "../../actions/authActions";
import { loadUser } from "../../actions/authActions";
import { setAlert } from "../../actions/alertAction";

import NavBar from "../layout/NavBar";
import { useNavigate, Link } from "react-router-dom";

const Register = ({ register, clearError, setAlert, loadUser, auth }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = user;
  const { isAuthenticated, error } = auth;

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.token) loadUser();

    if (isAuthenticated) navigate("/");

    if (error === "User already exists") {
      setAlert(error);
      clearError();
    }
    // eslint-disable-next-line
  }, [isAuthenticated, error]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      setAlert("Enter all fields");
    } else if (password !== password2) setAlert("Passwords do not match");
    else
      register({
        name,
        email,
        password,
      });
  };

  return (
    <>
      <NavBar />
      <div className='flex justify-center items-center h-[85%]'>
        <form
          className='auth-card flex flex-col items-center justify border border-gray-500 w-[350px] rounded-xl p-10 py-6'
          style={{ boxShadow: "1px 1px 10px #000" }}
          onSubmit={onSubmit}
        >
          <h1 className='text-3xl mb-4 font-semibold'>Register</h1>
          <input
            onChange={onChange}
            type='text'
            name='name'
            id=''
            placeholder='Name'
          />
          <input
            onChange={onChange}
            type='email'
            name='email'
            id=''
            placeholder='Email'
          />
          <input
            onChange={onChange}
            type='password'
            name='password'
            id=''
            placeholder='Password'
            minLength={6}
          />
          <input
            onChange={onChange}
            type='password'
            name='password2'
            placeholder='Confirm Password'
            minLength={6}
          />
          <input
            type='submit'
            value='Register'
            className='submitBtn  '
            tabIndex='1'
          />
          <Link to='/login' className='underline'>
            Already have an account? Login
          </Link>
        </form>
      </div>
    </>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {
  register,
  clearError,
  setAlert,
  loadUser,
})(Register);
