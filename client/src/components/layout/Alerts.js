import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledTransactionNotification = styled(motion.div)`
  min-width: 400px;
  margin-left: -200px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  left: 50%;
  bottom: 30px;
  opacity: 1;
`;

const StyledAuthNotification = styled.div`
  padding: 10px;
  background-color: whitesmoke; /* Red */
  color: black;
  position: absolute;
  display: inline-block;
  width: calc(100% - 20px);
  font-size: 18px;
  border-radius: 5px;
  margin: 10px 0;
  left: 50%;
  text-align: center;
  transform: translateX(-50%);
`;

const Alerts = ({ alerts }) => {
  return (
    alerts.length > 0 &&
    alerts.map(
      alert =>
        ({
          transaction__success: (
            <StyledTransactionNotification
              initial={{ x: '100vw', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              {alert.msg}
            </StyledTransactionNotification>
          ),
          auth__fail: (
            <StyledAuthNotification>
              <span style={{ fontSize: '22px' }}>
                <i
                  class='fa fa-exclamation-circle'
                  style={{ margin: '0 5px', color: 'tomato' }}
                ></i>
              </span>
              <span>{alert.msg}</span>
            </StyledAuthNotification>
          ),
          auth__success: (
            <StyledAuthNotification>
              <span>{alert.msg}</span>
              <span style={{ fontSize: '22px' }}>
                <i
                  class='fa fa-check-circle'
                  style={{ margin: '0  5px', color: 'skyblue' }}
                ></i>
              </span>
            </StyledAuthNotification>
          )
        }[alert.type])
    )
  );
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps, {})(Alerts);
