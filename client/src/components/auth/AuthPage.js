import React, { useState, useEffect } from 'react';

import './AuthPage.css';
import { loadUser } from '../../actions/authActions';
import { connect } from 'react-redux';
import Login from './Login';
import Register from './Register';
import { clearAlerts, setAlert } from '../../actions/alertActions';

const AuthPage = ({
  loadUser,
  isAuthenticated,
  history,
  loading,
  msg,
  error,
  setAlert,
  clearAlerts
}) => {
  useEffect(() => {
    loadUser();
    if (isAuthenticated) {
      history.push('/');
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  const [loginActive, setLoginActive] = useState(true);
  const toggle = () => {
    setLoginActive(!loginActive);
  };

  useEffect(() => {
    if (error) setAlert(error, 'auth__fail');
    // eslint-disable-next-line
  }, [error]);
  return (
    <React.Fragment>
      {loading && (
        <div className='loading__backdrop'>
          <div className='loading__spinner'>
            <i class='fa fa-cog fa-spin'></i>
            {msg}
          </div>
        </div>
      )}
      <div className='overall__container'>
        <div className='rectangle__container'>
          <div>
            <h1 className='branding__header'>
              Budget-<span style={{ color: 'tomato' }}>Z</span>
            </h1>
            <h6>Budget-Z helps manage your budgets.</h6>
          </div>

          {loginActive ? (
            <Login toggleRegister={toggle} />
          ) : (
            <Register toggleLogin={toggle} />
          )}
        </div>
        <div className='footer'>Copyright 2020 Anshuman</div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.loading.userLoading,
  msg: state.loading.msg,
  error: state.auth.error
});

export default connect(mapStateToProps, { loadUser, clearAlerts, setAlert })(
  AuthPage
);
