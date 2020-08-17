import React from 'react';
import { connect } from 'react-redux';
import './Transactions.css';
import styled from 'styled-components';
import { deleteTransaction } from '../../actions/transactionActions';
import { motion } from 'framer-motion';

const StyledButton = styled.button`
  min-width: 80px;

  padding: 5px;
  margin: 2px 5px;
  font-size: 16px;
  opacity: 1;
  border-radius: 5px;
  outline: none;
  border: none;
  height: 40px;
  width: 20%;

  :focus {
    outline: none;
  }
`;

const PrimaryButton = styled(StyledButton)`
  color: white;
  background-color: grey;
  transition: transform opacity ease-in;
  :hover {
    background-color: black;
    color: white;
  }
`;

const SecondaryButton = styled(StyledButton)`
  color: white;
  background-color: grey;
  :hover {
    background-color: black;
    color: white;
  }
`;
const DeleteTransactionModal = ({
  text,
  amount,
  deleteToggled,
  trans_id,
  setShowModal,
  deleteTransaction
}) => {
  const handleClick = e => {
    if (e.target.classList.contains('backdrop')) setShowModal(false);
  };
  return (
    <div className='backdrop' onClick={handleClick}>
      <motion.div
        className='modal__content'
        initial={{ y: '-20vh' }}
        animate={{ y: '0' }}
      >
        <div className='modal__header'>
          <i class='fa fa-trash'></i>Delete Transaction
        </div>
        {deleteToggled ? (
          <React.Fragment>
            <div className='modal__text'>
              Are you sure you want to delete the transaction{' '}
              <span
                style={
                  amount > 0
                    ? {
                        fontWeight: '600',
                        color: '#039be5'
                      }
                    : { fontWeight: '600', color: 'tomato' }
                }
              >
                {text}
              </span>{' '}
              amounting to{' '}
              <span
                style={
                  amount > 0
                    ? {
                        fontWeight: '600',
                        color: '#039be5'
                      }
                    : { fontWeight: '600', color: 'tomato' }
                }
              >
                {amount < 0 ? `-${Math.abs(amount).toFixed(2)}` : ` +${amount}`}
              </span>{' '}
              ?
            </div>
            <div className='modal__footer'>
              <PrimaryButton onClick={() => deleteTransaction(trans_id)}>
                Delete
              </PrimaryButton>
              <SecondaryButton onClick={() => setShowModal(false)}>
                Cancel
              </SecondaryButton>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className='modal__text'>
              Sorry, you can only delete transactions from the present month.
            </div>
            <div className='modal__footer'>
              <SecondaryButton onClick={() => setShowModal(false)}>
                Back
              </SecondaryButton>
            </div>
          </React.Fragment>
        )}
      </motion.div>
    </div>
  );
};

export default connect(null, { deleteTransaction })(DeleteTransactionModal);
