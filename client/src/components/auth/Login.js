import React, { useState } from 'react';
import { connect } from 'react-redux';

import { loadUser } from '../../actions/authActions';
import { clearAlerts, setAlert } from '../../actions/alertActions';
import { login } from '../../actions/authActions';
import './Forms.css';

const Login = ({ login, toggleRegister, clearAlerts, setAlert }) => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    clearAlerts();
    if (email === '' || password === '') {
      setAlert('Please enter all fields', 'auth__fail');
    } else {
      login({
        email,
        password
      });
    }
  };

  return (
    <form
      className='form__container__login'
      onSubmit={onSubmit}
      autoComplete='off'
    >
      <div>
        <div className='input__with__icons'>
          <i class='fa fa-user icon'></i>
          <input
            name='email'
            class='input__fields'
            type='text'
            placeholder='Username'
            onChange={onChange}
          />
        </div>
        <div className='input__with__icons'>
          <i class='fa fa-lock icon'></i>
          <input
            name='password'
            class='input__fields'
            type='password'
            placeholder='Password'
            onChange={onChange}
          />
        </div>
      </div>

      <button type='submit' className='btn__block'>
        LOGIN
      </button>

      <div className='additional__info'>
        <p>New User? </p>
        <button onClick={toggleRegister} className='btn__block__sec'>
          Sign Up
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  activeUser: state.auth.user
});

export default connect(mapStateToProps, {
  loadUser,
  login,
  clearAlerts,
  setAlert
})(Login);
