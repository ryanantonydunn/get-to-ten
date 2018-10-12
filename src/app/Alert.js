import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
`;

const AlertBox = styled.div`
  width: 300px;
  padding: 30px;
  background: #fff;
  color: #000;
  text-align: center;
`;

const Alert = ({ active, text, callback, closeAlert }) => {
  return active ? (
    <Wrapper>
      <AlertBox>
        {text}
        <br />
        <button
          onClick={() => {
            if (callback) {
              callback();
            } else {
              closeAlert();
            }
          }}
        >
          Proceed
        </button>
      </AlertBox>
    </Wrapper>
  ) : null;
};

export default Alert;
