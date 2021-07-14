import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

export const PhotoCardContainer = styled(Card)`
  width: 20vw;
  height: 40vh;
  margin-bottom: 5%;
  @media screen and (max-width: 1500px) {
    width: 35vw;
    height: 50vh;
    max-height: 380px;
  }
  @media screen and (max-width: 992px) {
    height: 50vh;
    max-height: 380px;
    width: 50vw;
  }

  @media screen and (max-width: 600px) {
    width: 90vw;
    height: 50vh;
    max-height: 340px;
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
  justify-content: space-between;
  background-color: #bd632f;

  @media screen and (max-width: 992px) {
    height: 20%;
  }
  @media screen and (max-width: 600px) {
    height: 30%;
    align-items: flex-start;
  }
`;
