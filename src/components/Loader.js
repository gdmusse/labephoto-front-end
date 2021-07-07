import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import logoloading from "../assets/images/logoloading.png";

const spin = keyframes`
0% { 
  transform: rotate(0deg); 
}
100% {
   transform: rotate(360deg); 
}
`;

const LogoImg = styled.img`
  animation: ${spin} 2s linear infinite;
  width: 10vw;
  @media screen and (max-width: 992px) {
    width: 30vw;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

class Loader extends Component {
  render() {
    return (
      <Wrapper>
        <LogoImg src={logoloading} />
      </Wrapper>
    );
  }
}
export default Loader;
