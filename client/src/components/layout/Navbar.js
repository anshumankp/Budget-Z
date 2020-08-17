import React, { useState } from 'react';

import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import { setAlert } from '../../actions/alertActions';
import './Navbar.css';

const NavBar = ({ user, logout, setAlert }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <React.Fragment>
      <div className='custom__navbar'>
        <div className='nav__container'>
          <div className='logo'>
            Budget-<span style={{ color: 'tomato' }}>Z</span>
          </div>
          {user && (
            <div
              className='user__dropdown'
              onMouseOver={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <div className='dropdown__button'>
                <i class='fas fa-user' style={{ marginRight: '12px' }}></i>
                <span style={{ marginRight: '12px' }}>
                  {user.name.split(' ')[0]}{' '}
                </span>
                <i class='fa fa-caret-down' style={{ marginLeft: 'auto' }}></i>
              </div>
              {dropdownOpen && (
                <div className='dropdown__content'>
                  <ul>
                    <li
                      onClick={() => {
                        logout();
                        setAlert('You have been logged out', 'auth__success');
                      }}
                    >
                      <i class='fa fa-sign-out' aria-label='Logout'></i>Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, { logout, setAlert })(NavBar);
