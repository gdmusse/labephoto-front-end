import React, { useContext, useEffect, useState } from "react";
import { InputsContainer, CreatePhotoFormContainer } from "./styled";
import TextField from "@material-ui/core/TextField";
import useForm from "../../hooks/useForm";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../constants/urls";
import { goToFeed } from "../../routes/coordinator";
import GlobalStateContext from "../../global/GlobalStateContext";
import Loader from "../../components/Loader";
import { makeStyles, withStyles } from "@material-ui/core";
import styled from "styled-components";

const TagContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const useStyles = makeStyles((theme) => ({
  button: {
    position: "relative",
    bottom: "7.5px",
    marginLeft: "1vw",
    height: "50px",
  },
}));

const CreatePhotoForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const [form, onChange, clear, setForm] = useForm({
    subtitle: "",
    file: "",
    tags: [],
    collection: "",
  });

  const { setOpenAlert, setAlertMsg, setAlertSeverity, loading, setLoading } =
    useContext(GlobalStateContext);

  const [tagsArray, setTagsArray] = useState([]);

  const onSubmitForm = async (event) => {
    event.preventDefault();
    form.tags = tagsArray;
    if (form.tags.length !== 0) {
      createPhoto(form, clear, history);
      setLoading(true);
    } else {
      setAlertMsg("Please input at least one tag");
      setAlertSeverity("error");
      setOpenAlert(true);
    }
  };

  const onClickTag = (input) => {
    if (input.length !== 0) {
      setTagsArray([...tagsArray, input]);
      setForm({ ...form, tags: [] });
    } else {
      setAlertMsg("Please input at least one character");
      setAlertSeverity("error");
      setOpenAlert(true);
    }
  };

  const onClickResetTags = () => {
    setTagsArray([]);
  };

  useEffect(() => {}, [tagsArray]);

  const createPhoto = async (body, clear, history) => {
    setLoading(true);

    try {
      await axios
        .post(`${BASE_URL}/photo/create`, body, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then(() => {
          setLoading(false);
          setAlertMsg("Photo Created");
          setAlertSeverity("success");
          setOpenAlert(true);
          goToFeed(history);
        });
    } catch (err) {
      setLoading(false);
      setAlertMsg(err.response.data.error);
      setAlertSeverity("error");
      setOpenAlert(true);
    }
  };

  return (
    <CreatePhotoFormContainer>
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={onSubmitForm}>
          <InputsContainer>
            <TextField
              name={"subtitle"}
              value={form.subtitle}
              onChange={onChange}
              label={"Subtitle"}
              variant={"outlined"}
              fullWidth
              margin={"normal"}
              required
              autoFocus
            />
            <TextField
              name={"file"}
              value={form.file}
              onChange={onChange}
              label={"File"}
              variant={"outlined"}
              fullWidth
              margin={"normal"}
              required
              autoFocus
            />
            <TagContainer>
              <TextField
                name={"tags"}
                value={form.tags}
                onChange={onChange}
                label={"Tags"}
                variant={"outlined"}
                fullWidth
                margin={"normal"}
                helperText={`tags: ${tagsArray}`}
              />
              <Button
                variant={"contained"}
                color={"primary"}
                className={classes.button}
                onClick={() => onClickTag(form.tags)}
              >
                Add Tag
              </Button>

              <Button
                variant={"contained"}
                color={"primary"}
                className={classes.button}
                onClick={() => onClickResetTags()}
              >
                Reset Tags
              </Button>
            </TagContainer>

            <TextField
              name={"collection"}
              value={form.collection}
              onChange={onChange}
              label={"Collection"}
              variant={"outlined"}
              fullWidth
              margin={"normal"}
              required
            />
          </InputsContainer>
          <Button
            type={"submit"}
            fullWidth
            variant={"contained"}
            color={"primary"}
          >
            Create Photo
          </Button>
        </form>
      )}
    </CreatePhotoFormContainer>
  );
};

export default CreatePhotoForm;
