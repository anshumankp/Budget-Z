import React from 'react';
import './about.css';
import { SocialMediaHandles } from './SocialInfo';
import styled from 'styled-components';

const StyledSocialButton = styled.a`
  padding: 5px;
  margin: 5px 10px;
  align-items: center;
  text-align: center;
  height: 50px;
  width: 50px;
  border: 1.5px solid grey;
  color: grey;
  background-color: white;
  outline: none;
  border-radius: 50%;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  :hover {
    background-color: #333;
    transform: scale(1.15);
    color: white;
  }
`;

const SocialContainer = () => {
  return (
    <div className='social__container'>
      {SocialMediaHandles.map(SocialMediaHandle => (
        <StyledSocialButton href={SocialMediaHandle.link} target='_blank'>
          <i class={SocialMediaHandle.icon}></i>
        </StyledSocialButton>
      ))}
    </div>
  );
};

export default SocialContainer;
