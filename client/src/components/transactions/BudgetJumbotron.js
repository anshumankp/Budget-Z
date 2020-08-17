import React, { useState } from 'react';
import { connect } from 'react-redux';

import Moment from 'react-moment';
import styled from 'styled-components';

import { nextMonth, prevMonth } from '../../actions/activeMonthActions';

const DatePicker = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  letter-spacing: 2px;
  @media only screen and (max-width: 1200px) {
    font-size: 20px;
  }
`;

const ActiveMonth = styled.div`
  color: ${props => (props.active ? 'black' : 'grey')};
  margin: 0 10px;
`;

const BudgetJumbotron = ({
  balance,
  income,
  expense,
  activePeriod,
  loginTime,
  nextMonth,
  prevMonth
}) => {
  const [activeCard, setActiveCard] = useState(0);

  const SwitchCard = () => {
    if (activeCard === 2) {
      setActiveCard(0);
    } else {
      setActiveCard(activeCard + 1);
    }
  };

  const gotoPreviousMonth = () => {
    prevMonth(activePeriod);
  };

  const gotoNextMonth = () => {
    nextMonth(activePeriod);
  };

  const showGotoNextMonth = () => {
    return (
      activePeriod.getFullYear() < loginTime.getFullYear() ||
      activePeriod.getMonth() < loginTime.getMonth()
    );
  };

  return (
    <div className='budget__card'>
      <DatePicker>
        <i
          class='fas fa-chevron-left'
          style={{ cursor: 'pointer' }}
          onClick={gotoPreviousMonth}
        ></i>

        <ActiveMonth
          active={
            activePeriod.getMonth() === loginTime.getMonth() &&
            activePeriod.getFullYear() === loginTime.getFullYear()
          }
        >
          <Moment format='MMMM YYYY'>{activePeriod}</Moment>
        </ActiveMonth>

        {showGotoNextMonth() && (
          <i
            class='fas fa-chevron-right'
            style={{ cursor: 'pointer' }}
            onClick={gotoNextMonth}
          ></i>
        )}
      </DatePicker>
      {
        {
          0: (
            <span className='total__balance'>
              <i class='fas fa-wallet icon-2x' onClick={SwitchCard}></i>
              Balance:{' '}
              {balance < 0
                ? `- ${Math.abs(balance).toFixed(2)}`
                : `+ ${balance.toFixed(2)}`}
              <i
                class='fas fa-retweet'
                style={{
                  fontSize: '35px',
                  cursor: 'pointer',
                  marginLeft: '35px',
                  color: 'grey'
                }}
                onClick={SwitchCard}
              ></i>
            </span>
          ),
          1: (
            <span className='total__income'>
              <i
                class='fas fa-wallet icon-2x'
                style={{ color: '#039be5' }}
                onClick={SwitchCard}
              ></i>
              Income: + {income.toFixed(2)}
              <i
                class='fas fa-retweet'
                style={{
                  fontSize: '35px',
                  cursor: 'pointer',
                  marginLeft: '35px',
                  color: 'grey'
                }}
                onClick={SwitchCard}
              ></i>
            </span>
          ),
          2: (
            <span className='total__expense'>
              <i
                class='fas fa-wallet icon-2x'
                style={{ color: 'tomato' }}
                onClick={SwitchCard}
              ></i>
              Expense: - {Math.abs(expense).toFixed(2)}
              <i
                class='fas fa-retweet'
                style={{
                  fontSize: '35px',
                  cursor: 'pointer',
                  marginLeft: '35px',
                  color: 'grey'
                }}
                onClick={SwitchCard}
              ></i>
            </span>
          )
        }[activeCard]
      }
    </div>
  );
};

const mapStateToProps = state => ({
  activePeriod: state.activePeriod.activePeriod,
  loginTime: state.activePeriod.loginTime
});

export default connect(mapStateToProps, {
  prevMonth,
  nextMonth
})(BudgetJumbotron);
