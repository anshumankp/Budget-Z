import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { NavItems } from './NavItems';

const StyledSideNav = styled.div`
  position: fixed;
  font-size: 12px;
  height: 100%;
  color: #9d9d9d;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: ${props => (props.navOpen ? '200px' : '60px')};

  top: 0;
  background-color: #333;
  overflow-x: hidden;
  transition: all 0.2s ease-in-out;
  z-index: 99;
`;

const StyledNavItem = styled(Link)`
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  text-decoration: none;
  color: #9d9d9d;
  transition: width 0.2s ease-in-out, border 0.2s ease-in-out;
  border-right: ${props => (props.$active ? '2px solid tomato' : 'none')};
  width: ${props => (props.$navOpen ? '200px' : '60px')};

  i {
    color: ${props => (props.$active ? 'white' : '#9d9d9d')};
    margin: 0 10px;
  }

  p {
    margin: auto 0;
    font-size: 18px;
    color: ${props => (props.$active ? 'white' : '#9d9d9d')};
    display: ${props => (props.$navOpen ? 'block' : 'none')};
  }

  :hover {
    background-color: lightgrey;
    cursor: pointer;
    text-decoration: none;
    p {
      color: black;
    }
    border: none;

    i {
      color: black;
    }
  }
`;

const SideBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activePath, setActivePath] = useState('/');

  const toggleSideNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <StyledSideNav
      navOpen={isNavOpen}
      onMouseEnter={toggleSideNav}
      onMouseLeave={toggleSideNav}
    >
      {NavItems.map(item => (
        <StyledNavItem
          $navOpen={isNavOpen}
          to={item.path}
          $active={item.path === activePath}
          onClick={() => setActivePath(item.path)}
        >
          <i class={item.icon}> </i>
          <p>{item.name}</p>
        </StyledNavItem>
      ))}
    </StyledSideNav>
  );
};

export default SideBar;
