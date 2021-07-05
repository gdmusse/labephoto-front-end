import React from "react";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import {
  PostCardContainer,
  PostCardContent,
  LeftContent,
  RightContent,
} from "./styled";
import { CardMedia } from "@material-ui/core";

const PhotoCard = (props) => {
  return (
    <PostCardContainer>
      <PostCardContent>
        <CardActionArea onClick={props.onClickCard}>
        <CardMedia
          component="img"
          alt={props.subtitle}
          height="140"
          image={props.image}
        />

          <Typography gutterBottom variant="h4">
            {props.subtitle}
          </Typography>
        </CardActionArea>
      </PostCardContent>
    </PostCardContainer>
  );
};

export default PhotoCard;
