import React from 'react';
import styled from 'styled-components';

const PaginateSection = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  padding-top: 15px;
  justify-content: center;

  border-top: 1px solid black;
  max-height: 50px;
  width: 100%;
`;
const PaginateButton = styled.button`
  width: 40px;
  padding: 5px;
  margin: 5px;
  color: white;
  opacity: ${props => (props.active ? '1' : '0.8')};
  background: ${props => (props.active ? 'tomato' : 'black')};
  height: 35px;
  text-align: center;
  border: none;
  border-radius: 5px;
  outline: none;

  &:focus {
    outline: none;
  }
`;

export const Pagination = ({
  totalPosts,
  postsPerPage,
  paginate,
  currentPage
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <PaginateSection>
      {pageNumbers.map(number => (
        <PaginateButton
          onClick={() => paginate(number)}
          active={number === currentPage}
        >
          {number}
        </PaginateButton>
      ))}
    </PaginateSection>
  );
};
