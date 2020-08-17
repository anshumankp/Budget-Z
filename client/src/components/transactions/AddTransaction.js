import React, { useState } from 'react';
import { connect } from 'react-redux';

import { addTransaction } from '../../actions/transactionActions';
import './Transactions.css';

import { resetMonth } from '../../actions/activeMonthActions';

const AddTransaction = ({
  addTransaction,
  activePeriod,
  loginTime,
  resetMonth
}) => {
  const [transaction, setTransaction] = useState({
    amount: '',
    text: '',
    type: '',
    classification: ''
  });

  let { amount, text, type, classification } = transaction;
  const handleSubmit = e => {
    e.preventDefault();
    if (type === 'expense') amount = -amount;
    addTransaction({ text, amount, classification });

    setTransaction({ amount: '', text: '', type: '', classification: '' });
  };

  const onChange = e => {
    if (e.target.name === 'type') setTransaction({ classification: '' });
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };
  return (
    <div className='addTransaction__section'>
      <span className='addTransaction__header'>New Transaction</span>
      <span className='line__fade'></span>
      {activePeriod.getMonth() === loginTime.getMonth() &&
      activePeriod.getFullYear() === loginTime.getFullYear() ? (
        <form
          className='addTransaction__container'
          autoComplete='off'
          onSubmit={handleSubmit}
        >
          <select name='type' value={type} onChange={onChange} required>
            <option value='' disabled>
              Type
            </option>
            <option value='expense'>Expense</option>
            <option value='income'>Income</option>
          </select>

          <select
            name='classification'
            value={classification}
            onChange={onChange}
            required
          >
            <option value='' disabled>
              Classification
            </option>
            {type === 'expense' ? (
              <React.Fragment>
                <option>Leisure</option>
                <option>Food</option>
                <option>Grocery</option>
                <option>Transportation</option>
                <option>Rent</option>
                <option>Education</option>
                <option>Other</option>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <option>Salary</option>
                <option>Rent</option>
                <option>Business</option>
                <option>Other</option>
              </React.Fragment>
            )}
          </select>

          <input
            type='text'
            name='text'
            value={text}
            onChange={onChange}
            placeholder='Description'
            className='description__input'
            required
          />

          <input
            type='number'
            min='0'
            step='0.01'
            name='amount'
            value={amount}
            onChange={onChange}
            placeholder='Amount'
            className='amount__input'
            required
          />

          <button className='add__btn' type='submit'>
            <i class='fa fa-check fa-2x' aria-hidden='true'></i>
          </button>
          <button className='add__btn__sm' type='submit'>
            Add
          </button>
        </form>
      ) : (
        <span
          style={{
            fontSize: '18px',
            marginTop: '10px',
            color: 'grey',
            marginLeft: '10px',
            marginRight: '10px'
          }}
        >
          You cannot add transactions to previous months. To jump to the present
          month,{' '}
          <span
            onClick={() => resetMonth(loginTime)}
            style={{
              cursor: 'pointer',
              fontWeight: '500',
              color: 'black',
              fontStyle: 'italic'
            }}
          >
            click here
          </span>
        </span>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  activePeriod: state.activePeriod.activePeriod,
  loginTime: state.activePeriod.loginTime
});

export default connect(mapStateToProps, {
  addTransaction,
  resetMonth
})(AddTransaction);
