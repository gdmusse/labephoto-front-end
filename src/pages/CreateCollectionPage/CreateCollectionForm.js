import React, { useContext, useEffect, useState } from "react";
import { InputsContainer, CreateCollectionFormContainer } from "./styled";
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


const ImgPreviewContainer = styled.div`
  height: 150px;
  width: 150px;
  border: 2px solid black;
  display: flex;
  overflow: hidden;
  justify-content: center;
`;

const ImgPreview = styled.img`
  object-fit: scale-down;
`;
const useStyles = makeStyles((theme) => ({
  button: {
    position: "relative",
    bottom: "7.5px",
    marginLeft: "1vw",
    height: "50px",
  },
}));

const CreateCollectionForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const [form, onChange, clear, setForm] = useForm({
    title: "",
    subtitle: "",
    iamge: "",
  });

  const { setOpenAlert, setAlertMsg, setAlertSeverity, loading, setLoading } =
    useContext(GlobalStateContext);

  const onSubmitForm = async (event) => {
    event.preventDefault();
    createCollection(form, clear, history);
    setLoading(true);
  };

  const createCollection = async (body, clear, history) => {
    setLoading(true);
    try {
      await axios
        .post(`${BASE_URL}/collection/create`, body, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then(() => {
          setLoading(false);
          setAlertMsg("Collection Created");
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

  useEffect(() => {}, []);

  return (
    <CreateCollectionFormContainer>
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={onSubmitForm}>
          <InputsContainer>
            <TextField
              name={"title"}
              value={form.title}
              onChange={onChange}
              label={"Title"}
              variant={"outlined"}
              fullWidth
              margin={"normal"}
              required
              autoFocus
              InputProps={{ inputProps: { maxLength: 15 } }}
            />
            <TextField
              name={"subtitle"}
              value={form.Subtitle}
              onChange={onChange}
              label={"Subtitle"}
              variant={"outlined"}
              fullWidth
              margin={"normal"}
              required
              autoFocus
            />
            <TextField
              name={"image"}
              value={form.image}
              onChange={onChange}
              label={"Image"}
              variant={"outlined"}
              fullWidth
              margin={"normal"}
              required
              autoFocus
            />
            <ImgPreviewContainer>
              {" "}
              <ImgPreview src={form.image} />
            </ImgPreviewContainer>
          </InputsContainer>
          <Button
            type={"submit"}
            fullWidth
            variant={"contained"}
            color={"primary"}
          >
            Create Colection
          </Button>
        </form>
      )}
    </CreateCollectionFormContainer>
  );
};

export default CreateCollectionForm;
