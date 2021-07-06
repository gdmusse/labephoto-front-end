import styled from "styled-components";
import Fab from "@material-ui/core/Fab";

export const ScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100vw;
  margin-top: 5vh;
  overflow-x: hidden;
`;

export const AddPostButton = styled(Fab)`
  position: fixed !important;
  right: 20px;
  bottom: 20px;
  z-index: 3;
`;
