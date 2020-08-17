import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import LoadingOverlay from 'react-loading-overlay';

const StyledLoader = styled(LoadingOverlay)`
  overflow: scroll;
  position: absolute;
  z-index: -9999;
  top: 50px;
  left: 60px;
  width: 100%;
  height: 100%;
  .MyLoader_wrapper {
  }
  .MyLoader_overlay {
    background: rgba(9, 0, 0, 0.5);
  }
  .MyLoader_content {
  }
  .MyLoader_spinner {
  }

  &.MyLoader_wrapper--active {
    z-index: 9999;
    overflow: hidden;
  }
`;

const MyLoader = ({ isLoading, msg }) => {
  return (
    <StyledLoader
      active={isLoading}
      spinner
      fadeSpeed={0}
      text={msg}
      classNamePrefix='MyLoader_'
    />
  );
};

const mapStateToProps = state => ({
  isLoading: state.loading.isLoading,
  msg: state.loading.msg
});

export default connect(mapStateToProps, {})(MyLoader);
