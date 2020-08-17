import React, { useState } from 'react';
import { connect } from 'react-redux';
import './Transactions.css';
import { setAlert } from '../../actions/alertActions';
import Moment from 'react-moment';
import { deleteTransaction } from '../../actions/transactionActions';
import { IconSelector } from './Icons.util';
import DeleteTransactionModal from './DeleteTransactionModal';

const TransactionItem = ({
  text,
  amount,
  date,
  classification,
  trans_id,
  deleteTransaction,
  activePeriod,
  loginTime,
  setAlert
}) => {
  const type = amount < 0 ? 'expense' : 'income';
  const [showModal, setShowModal] = useState(false);
  return (
    <React.Fragment>
      <div className='transaction__item'>
        <div className='transaction__date'>
          <div className='date__day'>
            {' '}
            <Moment format='Do'>{date}</Moment>
          </div>
          <div className='date__month'>
            {' '}
            <Moment format='MMM'>{date}</Moment>
          </div>
        </div>
        <div className='transaction__description'>
          <span className='text'>{text}</span>
          <span className='transaction_type'>
            <i class={IconSelector(classification)}></i>
            {classification}
          </span>
        </div>
        <span className={`transaction__amount ${type}`}>
          {' '}
          {amount < 0 ? `- ${Math.abs(amount).toFixed(2)}` : `+ ${amount}`}
        </span>

        <span className='remove__btn'>
          <i
            class='fa fa-trash'
            aria-hidden='true'
            onClick={() => setShowModal(true)}
          ></i>
        </span>
      </div>
      {showModal && (
        <DeleteTransactionModal
          transaction={(trans_id, text, amount)}
          amount={amount}
          trans_id={trans_id}
          date={date}
          text={text}
          toggle={setShowModal}
          deleteToggled={
            activePeriod.getMonth() === loginTime.getMonth() &&
            activePeriod.getFullYear() === loginTime.getFullYear()
          }
          setShowModal={setShowModal}
        />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  activePeriod: state.activePeriod.activePeriod,
  loginTime: state.activePeriod.loginTime
});

export default connect(mapStateToProps, { deleteTransaction, setAlert })(
  TransactionItem
);
