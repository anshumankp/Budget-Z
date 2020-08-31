import React, { useState } from 'react';
import './about.css';

import SocialContainer from './SocialContainer';
import styled from 'styled-components';

const StyledButton = styled.button`
  width: 170px;
  height: 60px;
  color: ${props => (props.active ? 'black' : 'grey')};
  background-color: whitesmoke;
  padding: 5px;
  font-size: 20px;
  outline: none;

  border: none;
  transform: ${props => (props.active ? 'scale(1.1)' : 'none')};
  transition: transform 0.4s ease-in-out;
  margin: 0 10px;
  border-bottom: ${props => (props.active ? '2px solid tomato' : 'none')};
  :first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  :last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  :focus {
    outline: none;
  }
`;

const StyledHeading = styled.h2`
  margin: 20px 0;
  padding: 5px;
  color: grey;
`;

const StyledLine = styled.span`
  width: 150px;
  height: 1.5px;
  background-color: lightgrey;
`;

const About = () => {
  const [activeTab, setActiveTab] = useState(2);
  return (
    <div className='about__container'>
      <div className='about__tabs'>
        <StyledButton active={activeTab === 1} onClick={() => setActiveTab(1)}>
          The App
        </StyledButton>
        <StyledButton active={activeTab === 2} onClick={() => setActiveTab(2)}>
          The Dev
        </StyledButton>
      </div>

      {
        {
          1: (
            <React.Fragment>
              <StyledHeading>About the Application</StyledHeading>
              <StyledLine />
              <div className='about__content'>
                <p>
                  This is a single page web application developed using MERN
                  stack (with Redux and Chart-js).
                </p>
                <p>
                  Please drop your feedback, suggestions or enquiries at:{' '}
                  <span style={{ fontWeight: 'bold' }}>
                    anshuman.kp018@gmail.com
                  </span>
                </p>
              </div>
              <StyledLine />
              <SocialContainer />
            </React.Fragment>
          ),
          2: (
            <React.Fragment>
              <StyledHeading>About the Developer</StyledHeading>
              <StyledLine />
              <div className='about__content'>
                <p>Hey! I'm Anshuman Kashyap.</p>
                <p>
                  A full stack developer based in Bangalore, intent on
                  developing web applications using the latest technologies,
                  clean code and UI which is easy on the eyes.
                </p>
              </div>
              <StyledLine />
              <SocialContainer />
            </React.Fragment>
          )
        }[activeTab]
      }
    </div>
  );
};

export default About;
