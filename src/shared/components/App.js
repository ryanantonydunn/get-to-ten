import React, { Component } from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #223322;
`;

export default class Class extends Component {
  render() {
    return (
      <Wrapper>
        <img src={logo} alt="Logo" />
      </Wrapper>
    );
  }
}
