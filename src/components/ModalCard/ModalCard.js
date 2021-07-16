import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import { InputsDiv, ModalCardContainer, ModalCardContent } from "./styled";
import { Button, CardMedia, MenuItem, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AlertModified from "../Alert";
import GlobalStateContext from "../../global/GlobalStateContext";

const useStyles = makeStyles((theme) => ({
  media: {
    objectFit: "contain",
    height: "350px",
    "@media (max-width: 600px)": { height: "300px" },
  },
  content: {
    display: "flex",
    flexDirection: "column",
  },
}));



const ModalCard = (props) => {
  const classes = useStyles();

  const { collectionInput, setCollectionInput, collectionsArray } =
    useContext(GlobalStateContext);

  const tagsArray = props.tags.split(",");
  const tags = tagsArray.map((tag) => {
    return `#${tag} `;
  });

  const handleChange = (event) => {
    setCollectionInput(event.target.value);
  };

  return (
    <ModalCardContainer>
      <AlertModified />
      <ModalCardContent className={classes.content}>
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
          {tags}
        </Typography>
        {props.collections ? (
          <Typography gutterBottom variant="h5" align="center">
            collections: {props.collections}
          </Typography>
        ) : (
          <div></div>
        )}

        <InputsDiv>
          <TextField
            id="select-collection"
            select
            value={collectionInput}
            onChange={handleChange}
            helperText="Select a collection to add photo to"
          >
            {collectionsArray.map((option) => (
              <MenuItem  key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button onClick={props.onClick}>Add to Collection</Button>
        </InputsDiv>
      </ModalCardContent>
    </ModalCardContainer>
  );
};

export default ModalCard;
