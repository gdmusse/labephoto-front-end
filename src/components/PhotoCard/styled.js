import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

export const PhotoCardContainer = styled(Card)`
  width: 30vw;
  height: 40vh;
  margin-bottom: 5%;
  @media screen and (max-width: 992px) {
    width: 80vw;
  }

  @media screen and (max-width: 600px) {
    width: 90vw;
    height: 50vh;
  }
`;

export const PhotoCardContent = styled(CardContent)`
  display: flex;
  min-height: 10vh;
  background-color: #f2f2f2;
  @media screen and (max-width: 600px) {
    padding: 10px;
  }
`;
