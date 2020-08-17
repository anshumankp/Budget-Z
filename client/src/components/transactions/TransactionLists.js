import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './Transactions.css';

import TransactionItem from './TransactionItems';
import styled from 'styled-components';
import { Pagination } from './Pagination';
import { setAlert } from '../../actions/alertActions';

const TransactionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    background: transparent;
    min-height:60%;
    height: 100%:
    width: 100%;
  
  }`;

const TransactionLists = ({
  selectedTypeTransactions,
  transactionsType,
  activePeriod,
  transactionsLoading,
  transactionsUpdate,
  setAlert
}) => {
  // Pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  // Get Current Transactions
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const currentTransactions = selectedTypeTransactions.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  useEffect(() => {
    setCurrentPage(1);
    // eslint-disable-next-line
  }, [transactionsType, activePeriod]);

  useEffect(() => {
    if (transactionsUpdate === 'transaction__added')
      setAlert('Transaction Added', 'transaction__success', 2000);
    else if (transactionsUpdate === 'transaction__deleted')
      setAlert('Transaction Deleted', 'transaction__success', 2000);
    // eslint-disable-next-line
  }, [transactionsUpdate]);

  return (
    <React.Fragment>
      <TransactionsContainer>
        {!transactionsLoading ? (
          currentTransactions.length > 0 ? (
            currentTransactions.map(transaction => (
              <TransactionItem
                amount={transaction.amount.toFixed(2)}
                date={transaction.createdAt}
                text={transaction.text}
                trans_id={transaction._id}
                classification={transaction.classification}
              />
            ))
          ) : (
            <p>No Transaction to show</p>
          )
        ) : (
          <div>
            <h3>
              <i className='fa fa-cog fa-spin' />
              Loading...
            </h3>
          </div>
        )}
      </TransactionsContainer>
      {currentTransactions.length > 0 && (
        <Pagination
          totalPosts={selectedTypeTransactions.length}
          postsPerPage={postsPerPage}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  loading: state.transaction.loading,
  transactionsLoading: state.loading.transactionsLoading,
  activePeriod: state.activePeriod.activePeriod,
  transactionsUpdate: state.transaction.transactionsUpdate
});

export default connect(mapStateToProps, { setAlert })(TransactionLists);
