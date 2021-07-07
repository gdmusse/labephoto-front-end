import React from "react";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import { ModalCardContainer, ModalCardContent } from "./styled";
import { CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  media: {
    objectFit: "contain",
    height: "350px",
    ["@media (max-width: 600px)"]: { height: "300px" },
  },
}));

const ModalCard = (props) => {
  const classes = useStyles();
  return (
    <ModalCardContainer>
      <ModalCardContent>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={props.subtitle}
            image={props.image}
            className={classes.media}
          />
          <Typography gutterBottom variant="h4" align="center">
            {props.subtitle}
          </Typography>
          <Typography gutterBottom variant="h6" align="center">
            by {props.author} at {props.createdAt}
          </Typography>

          <Typography gutterBottom variant="h5" align="center">
            tags: {props.tags}
          </Typography>
          <Typography gutterBottom variant="h5" align="center">
            collection: {props.collection}
          </Typography>
        </CardActionArea>
      </ModalCardContent>
    </ModalCardContainer>
  );
};

export default ModalCard;
