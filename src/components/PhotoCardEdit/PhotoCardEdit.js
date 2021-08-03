import React from "react";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import {
  ButtonDiv,
  PhotoCardContainer,
  PhotoCardContent,
  SubtitleDiv,
} from "./styled";
import { Button, CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
  },
  removeButton: {
    backgroundColor: "#bf3732",
    "&:hover": {
      background: "#9b2b27",
    },
  },
}));

const PhotoCardEdit = (props) => {
  const classes = useStyles();

  return (
    <div>
      <PhotoCardContainer className={classes.container}>
        <PhotoCardContent>
          <CardActionArea onClick={props.onClickCard}>
            <CardMedia
              component="img"
              alt={props.subtitle}
              image={props.image}
              className={classes.media}
            />

            <SubtitleDiv>
              <Typography gutterBottom variant="h5">
                {props.subtitle}
              </Typography>
            </SubtitleDiv>
          </CardActionArea>
        </PhotoCardContent>
      </PhotoCardContainer>
      <ButtonDiv>
        {" "}
        <Button
          variant="contained"
          color="primary"
          size="small"
          disableElevation={true}
          className={classes.removeButton}
          onClick={props.onClickRemove}
        >
          Delete Photo
        </Button>
      </ButtonDiv>
    </div>
  );
};

export default PhotoCardEdit;
