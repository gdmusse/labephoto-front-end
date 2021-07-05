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
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  media: {
    objectFit: 'scale-down'
  }
}));



const ModalCard = (props) => {
  const classes = useStyles();
  return (
    <PostCardContainer>
      <PostCardContent>
        <CardActionArea>
        <CardMedia
          component="img"
          alt={props.subtitle}
          height="300"
          image={props.image}
          className={classes.media}
        />
          <Typography gutterBottom variant="h4">
            {props.subtitle}
          </Typography>
          <Typography gutterBottom variant="h6">
            by {props.author} at {props.createdAt}
          </Typography>

          <Typography gutterBottom variant="h5">
            tags: {props.tags}
          </Typography>
          <Typography gutterBottom variant="h5">
            collection: {props.collection}
          </Typography>

        </CardActionArea>
      </PostCardContent>
    </PostCardContainer>
  );
};

export default ModalCard;
