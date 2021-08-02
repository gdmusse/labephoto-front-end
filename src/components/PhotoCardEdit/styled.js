import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

export const PhotoCardContainer = styled(Card)`
  width: 365px;
  height: 380px;
  margin-bottom: 5%;
  @media screen and (max-width: 600px) {
    max-width: 90vw;
    max-height: 330px;
  }
`;

export const PhotoCardContent = styled(CardContent)`
  display: flex;
  background-color: #d8c99b;
  padding: 0;
`;

export const SubtitleDiv = styled.div`
  display: flex;
  height: 20%;
  padding: 3%;
  padding-top: 1%;
  align-items: center;
  justify-content: center;
  background-color: #bd632f;

  @media screen and (max-width: 992px) {
    height: 20%;
  }
  @media screen and (max-width: 600px) {
    height: 30%;
    align-items: flex-start;
  }
`;

export const ButtonDiv = styled.div`
  display: flex;
  margin-bottom: 5%;
  align-items: center;
  justify-content: center;
`