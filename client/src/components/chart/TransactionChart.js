import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Pie } from 'react-chartjs-2';
import {
  expenseByClassification,
  incomeByClassification,
  transactionsSum
} from '../transactions/CalculatedTransactions.util';
import BudgetJumbotron from '../transactions/BudgetJumbotron';
import { getMonthlyTransactions } from '../../actions/transactionActions';
import { connect } from 'react-redux';

const StyledCanvasSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin: auto;

  width: 80%;
  height: 100%;
  margin-bottom: 150px;
  margin-top: 20px;
`;
const StyledCanvasWrapper = styled.div`
  display: flex;

  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;

  padding: 5px;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const StyledCanvas = styled.div`
  height: 100%;
  width: 100%;
  margin-bottom: 20px;
  flex: 1;
`;

const TransactionChart = ({
  transactions,
  getMonthlyTransactions,
  activePeriod
}) => {
  useEffect(() => {
    const month = activePeriod.getMonth();
    const year = activePeriod.getFullYear();
    getMonthlyTransactions({ month, year });
    // eslint-disable-next-line
  }, [activePeriod]);
  const expenseClassifications = [
    'Leisure',
    'Food',
    'Grocery',
    'Transportation',
    'Rent',
    'Education',
    'Other'
  ];

  const incomeClassifications = ['Salary', 'Rent', 'Business', 'Other'];

  const expenseRes = expenseClassifications.map(expenseClassification =>
    expenseByClassification(transactions, expenseClassification)
  );

  const incomeRes = incomeClassifications.map(incomeClassification =>
    incomeByClassification(transactions, incomeClassification)
  );

  const incomeSum = transactionsSum(transactions, 'income');

  const expenseSum = transactionsSum(transactions, 'expense');

  const balance = transactionsSum(transactions, 'all');
  const expenseOptions = {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      position: 'left',
      labels: {
        boxWidth: 20,
        fontSize: 14
      }
    },
    title: {
      display: true,
      text: 'Expenses',
      fontSize: 20
    }
  };

  const incomeOptions = {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      position: 'left',
      labels: {
        boxWidth: 20,
        fontSize: 14
      }
    },
    title: {
      display: true,
      text: 'Income',
      fontSize: 20
    }
  };

  const expenseData = {
    labels: expenseClassifications,
    datasets: [
      {
        data: expenseRes,
        backgroundColor: [
          '#176ba0',
          '#6e70b3',
          '#b071b1',
          '#e1759d',
          '#fc8780',
          '#ffa666'
        ],
        hoverBackgroundColor: [
          '#176ba0',
          '#6e70b3',
          '#b071b1',
          '#e1759d',
          '#fc8780',
          '#ffa666'
        ]
      }
    ]
  };

  const incomeData = {
    labels: incomeClassifications,
    datasets: [
      {
        data: incomeRes,
        backgroundColor: [
          '#176ba0',
          '#6e70b3',
          '#b071b1',
          '#e1759d',
          '#fc8780',
          '#ffa666'
        ],
        hoverBackgroundColor: [
          '#176ba0',
          '#6e70b3',
          '#b071b1',
          '#e1759d',
          '#fc8780',
          '#ffa666'
        ]
      }
    ]
  };

  return (
    <React.Fragment>
      <BudgetJumbotron
        balance={balance}
        income={incomeSum}
        expense={expenseSum}
      />
      <StyledCanvasSection>
        <StyledCanvasWrapper>
          <StyledCanvas>
            <Pie
              data={expenseData}
              width={400}
              height={400}
              options={expenseOptions}
            />
          </StyledCanvas>
          <StyledCanvas>
            <Pie
              data={incomeData}
              width={400}
              height={400}
              options={incomeOptions}
            />
          </StyledCanvas>
        </StyledCanvasWrapper>
      </StyledCanvasSection>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  transactions: state.transaction.transactions,
  activePeriod: state.activePeriod.activePeriod
});

export default connect(mapStateToProps, {
  getMonthlyTransactions
})(TransactionChart);
