import styled from "styled-components";
import Toolbar from "@material-ui/core/Toolbar";

export const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 975px;
  align-items: center;
  margin: auto;
`;

export const LogoDiv = styled.img`
  display: flex;
  max-height: 64px;
  @media screen and (max-width: 992px) {
    display: none;
  }
`;

export const LogoDivTwo = styled.img`
  display: none;
  max-height: 64px;
  @media screen and (max-width: 992px) {
    display: flex;
  }
`;

export const AppDiv = styled.div`
  width: 33%;
`;
