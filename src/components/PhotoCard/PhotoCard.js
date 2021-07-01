import React from "react";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import {
  PostCardContainer,
  PostCardContent,
  LeftContent,
  RightContent,
} from "./styled";


const PhotoCard = (props) => {
  return (
    <PostCardContainer>
      <PostCardContent>
        <LeftContent>
          <Typography align="center" variant="h6">
            {props.votesCount}
          </Typography>
        </LeftContent>
        <CardActionArea>
          <RightContent onClick={props.onClickCard}>
            <Typography gutterBottom variant="h4">
              {props.title}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              {props.text}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              by {props.username} at {props.createdAt}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {props.commentsCount} comments
            </Typography>
          </RightContent>
        </CardActionArea>
      </PostCardContent>
    </PostCardContainer>
  );
};

export default PhotoCard;
