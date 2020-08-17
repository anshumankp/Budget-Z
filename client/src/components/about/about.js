import React, { useState } from 'react';
import './about.css';
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

  :hover {
    border: 1px dotted black;
    background-color: #333;
    transform: scale(1.15);
    i {
      color: white;
    }
  }
`;

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
                  stack, along with Redux and Chart-js.
                </p>
                <p>
                  For feedbacks or suggestions for improvement, please reach out
                  to me at
                </p>
                <p style={{ fontWeight: 'bold' }}>anshuman.kp018@gmail.com</p>
              </div>
              <StyledLine />
            </React.Fragment>
          ),
          2: (
            <React.Fragment>
              <StyledHeading>About the Developer</StyledHeading>
              <StyledLine />
              <div className='about__content'>
                <p>
                  Hey! I'm Anshuman Kashyap. An aspiring full stack web
                  developer with a liking towards minimal UI, garam chai and
                  lifting iron :)
                </p>
              </div>
              <StyledLine />
              <div className='social__container'>
                <StyledSocialButton
                  href='https://www.facebook.com/anshuman.kashyap.10/'
                  target='_blank'
                >
                  <i class='fa fa-facebook fa-2x'></i>
                </StyledSocialButton>
                <StyledSocialButton
                  href='https://www.instagram.com/_anshuman_kp/'
                  target='_blank'
                >
                  <i class='fa fa-instagram fa-2x'></i>
                </StyledSocialButton>
                <StyledSocialButton
                  href='https://www.linkedin.com/in/anshuman-kashyap-212746199/'
                  target='_blank'
                >
                  <i class='fa fa-linkedin fa-2x'></i>
                </StyledSocialButton>
              </div>
            </React.Fragment>
          )
        }[activeTab]
      }
    </div>
  );
};

export default About;
