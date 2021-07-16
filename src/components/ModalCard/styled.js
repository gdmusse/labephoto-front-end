import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

export const ModalCardContainer = styled(Card)`
  width: 60vw;
  overflow-x: hidden;
  @media screen and (max-width: 992px) {
    width: 80vw;
  }
  @media screen and (max-width: 600px) {
    width: 90vw;
  }
`;

export const ModalCardContent = styled(CardContent)`
  display: flex;
  min-height: 10vh;
  background-color: #f2f2f2;
  @media screen and (max-width: 600px) {
    padding: 10px;
  }
`;

export const InputsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
