import React, { useState } from 'react';

import './Transactions.css';

import styled from 'styled-components';

import TransactionLists from './TransactionLists';

const TransactionListSection = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    background: transparent;
    margin-left: 5px;
  }`;

const StyledButton = styled.span`
  width: 150px;
  height: 60px;
  color: ${props => (props.active ? 'black' : 'grey')};
  background-color: transparent;
  padding: 5px;
  font-size: ${props => (props.active ? '20px' : '18px')};
  outline: none;
  border: none;
  margin-right: 50px;

  transition: all 0.2s ease-in-out;

  :hover {
    p {
      cursor: pointer;
    }
  }
`;

export const TransactionHistory = ({ transactions }) => {
  const incomeTransactions = transactions.filter(item => item.amount > 0);
  const expenseTransactions = transactions.filter(item => item.amount < 0);

  const [currentTransactionType, setCurrentTransactionType] = useState('all');
  return (
    <div className='transaction-history__container'>
      <div className='transaction-type__buttons'>
        <StyledButton
          active={currentTransactionType === 'all'}
          onClick={() => setCurrentTransactionType('all')}
        >
          <p>All</p>
        </StyledButton>
        <StyledButton
          active={currentTransactionType === 'income'}
          onClick={() => setCurrentTransactionType('income')}
        >
          <p>Income</p>
        </StyledButton>
        <StyledButton
          active={currentTransactionType === 'expense'}
          onClick={() => setCurrentTransactionType('expense')}
        >
          <p>Expenses</p>
        </StyledButton>
      </div>
      <TransactionListSection>
        {
          {
            all: (
              <React.Fragment>
                <TransactionLists
                  transactionsType='all'
                  selectedTypeTransactions={transactions}
                />
              </React.Fragment>
            ),
            expense: (
              <React.Fragment>
                <TransactionLists
                  transactionsType='expense'
                  selectedTypeTransactions={expenseTransactions}
                />
              </React.Fragment>
            ),
            income: (
              <React.Fragment>
                <TransactionLists
                  transactionsType='income'
                  selectedTypeTransactions={incomeTransactions}
                />
              </React.Fragment>
            )
          }[currentTransactionType]
        }
      </TransactionListSection>
    </div>
  );
};
