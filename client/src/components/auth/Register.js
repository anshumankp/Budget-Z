import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authActions';
import { clearAlerts, setAlert } from '../../actions/alertActions';
import { register } from '../../actions/authActions';
import './Forms.css';

const Register = ({ register, setAlert, toggleLogin, clearAlerts }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    clearAlerts();
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields', 'auth__fail');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'auth__fail');
    } else {
      clearAlerts();
      register({
        name,
        email,
        password
      });
    }
  };

  return (
    <form
      className='form__container__signup'
      onSubmit={onSubmit}
      autoComplete='off'
    >
      <div>
        <div class='input__with__icons'>
          <i class='fa fa-info icon'></i>
          <input
            name='name'
            class='input__fields'
            type='text'
            placeholder='Full Name'
            onChange={onChange}
            autoComplete='new-password'
          />
        </div>
        <div class='input__with__icons'>
          <i class='fa fa-user icon'></i>
          <input
            name='email'
            class='input__fields'
            type='text'
            placeholder='Username (E-mail)'
            onChange={onChange}
            autoComplete='new-password'
          />
        </div>
        <div class='input__with__icons'>
          <i class='fa fa-unlock icon'></i>
          <input
            name='password'
            class='input__fields'
            type='password'
            placeholder='Password'
            onChange={onChange}
          />
        </div>
        <div class='input__with__icons'>
          <i class='fa fa-lock icon'></i>
          <input
            name='password2'
            class='input__fields'
            type='password'
            placeholder='Confirm Password'
            onChange={onChange}
          />
        </div>
      </div>

      <button type='submit' className='btn__block'>
        SIGN UP
      </button>

      <div className='additional__info'>
        <p className='typography'>Already a user? </p>
        <button onClick={toggleLogin} className='btn__block__sec'>
          Login
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {
  register,
  loadUser,
  setAlert,
  clearAlerts
})(Register);
