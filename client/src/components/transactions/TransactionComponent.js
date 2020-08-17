import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './Transactions.css';
import { getMonthlyTransactions } from '../../actions/transactionActions';
import { transactionsSum } from './CalculatedTransactions.util';

import { TransactionHistory } from './TransactionHistory';
import AddTransaction from './AddTransaction';
import BudgetJumbotron from './BudgetJumbotron';

export const TransactionComponent = ({
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

  const totalIncome = transactionsSum(transactions, 'income');
  const totalExpense = transactionsSum(transactions, 'expense');
  const balance = transactionsSum(transactions, 'all');

  return (
    <React.Fragment>
      <BudgetJumbotron
        balance={balance}
        income={totalIncome}
        expense={totalExpense}
      />
      <AddTransaction />
      <TransactionHistory transactions={transactions} />
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  transactions: state.transaction.transactions,
  activePeriod: state.activePeriod.activePeriod
});

export default connect(mapStateToProps, {
  getMonthlyTransactions
})(TransactionComponent);
