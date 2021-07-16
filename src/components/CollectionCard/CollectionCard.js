import React from "react";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import {
  CollectionCardContainer,
  CollectionCardContent,
  CardText,
} from "./styled";
import { CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { goToCollectionDetailsPage } from "../../routes/coordinator";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  media: {
    objectFit: "cover",
    height: "19rem",
    "@media (max-width: 600px)": { height: "280px" },
  },
  container: {
    boxShadow: "none",
    outline: "1px solid grey",
    outlineOffset: "1px",
    padding: "0",
  },
  content: {
    padding: "0",
    "&:last-child": {
      paddingBottom: 0,
    },
  },
}));

const CollectionCard = (props) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <CollectionCardContainer className={classes.container}>
      <CollectionCardContent className={classes.content}>
        <CardActionArea
          onClick={() => goToCollectionDetailsPage(history, props.id)}
        >
          <CardMedia
            component="img"
            alt={props.title}
            image={props.image}
            className={classes.media}
          />
          <CardText>
            <Typography gutterBottom variant="h4">
              {props.title}
            </Typography>
            <Typography gutterBottom variant="h5">
              {props.subtitle}
            </Typography>
            <Typography gutterBottom variant="h6" align="right">
              created at {props.date}
            </Typography>
          </CardText>
        </CardActionArea>
      </CollectionCardContent>
    </CollectionCardContainer>
  );
};

export default CollectionCard;
