import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

export const PostCardContainer = styled(Card)`
  width: 60vw;
  margin: 5%;
  @media screen and (max-width: 992px) {
    width: 80vw;
  }

  @media screen and (max-width: 600px) {
    width: 90vw;
  }
`;

export const PostCardContent = styled(CardContent)`
  display: flex;
  min-height: 10vh;
  background-color: #f2f2f2;
  @media screen and (max-width: 600px) {
    padding: 10px;
  }
`;
export const LeftContent = styled.div`
  margin-right: 5%;
  margin-top: 4px;
`;
export const RightContent = styled.div``;
