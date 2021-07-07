import React from "react";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import { PhotoCardContainer, PhotoCardContent } from "./styled";
import { CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  media: {
    objectFit: "scale-down",
  },
}));

const PhotoCard = (props) => {
  const classes = useStyles();
  return (
    <PhotoCardContainer>
      <PhotoCardContent>
        <CardActionArea onClick={props.onClickCard}>
          <CardMedia
            component="img"
            alt={props.subtitle}
            height="280"
            image={props.image}
            className={classes.media}
          />

          <Typography gutterBottom variant="h4">
            {props.subtitle}
          </Typography>
        </CardActionArea>
      </PhotoCardContent>
    </PhotoCardContainer>
  );
};

export default PhotoCard;
