import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import DialogContent from "@material-ui/core/DialogContent";
import GlobalStateContext from "../global/GlobalStateContext";
import BASE_URL from "../constants/urls";
import axios from "axios";
import styled from "styled-components";
import ModalCard from "./ModalCard/ModalCard";
import dayjs from "dayjs";
import Loader from "./Loader";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    left: "20vw",
    top: "10vh",
    width: "60vw",
    paddingRight: 0,
    "@media (max-width: 900px)": { left: "10vw" },
    "@media (max-width: 600px)": { left: "5vw" },
  },
}));

const LoaderDiv = styled.div`
  margin-top: 30vh;
  overflow-x: hidden;
  padding-right: 0;
`;

const ScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100vw;
  margin-top: 5vh;
  overflow-x: hidden;
`;

const TransitionsModal = () => {
  const classes = useStyles();
  const {
    openModal,
    setOpenModal,
    setModalInfo,
    modalInfo,
    loadingModal,
    setLoadingModal,
    setAlertMsg,
    setAlertSeverity,
    setOpenAlert,
    collectionInput,
  } = useContext(GlobalStateContext);

  const [photo, setPhoto] = useState({});
  const [photoDate, setPhotoDate] = useState("");

  const handleClose = () => {
    setModalInfo("");
    setPhoto({});
    setPhotoDate("");
    setOpenModal(false);
  };

  const getPhotoById = async (id) => {
    if (id) {
      setLoadingModal(true);
      try {
        await axios
          .get(`${BASE_URL}/photo/${id}`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((res) => {
            setPhoto(res.data.photo);
            setPhotoDate(dayjs(photo.date).format("DD/MM/YYYY HH:mm"));
            setLoadingModal(false);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const addPhotoToCollection = async (photo_id, collection_id) => {
    if (photo_id) {
      setLoadingModal(true);
      try {
        const body = {
          collection_id: `${collection_id}`,
        };
        await axios
          .post(`${BASE_URL}/photo/${photo_id}`, body, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((res) => {
            setLoadingModal(false);
            setAlertMsg("Photo added to collection");
            setAlertSeverity("success");
            setOpenAlert(true);

            setOpenModal(false);
            setModalInfo("");
            setPhoto({});
            setPhotoDate("");
          });
      } catch (err) {
        setAlertMsg(err.response.data.error);
        setAlertSeverity("error");
        setOpenAlert(true);
        setLoadingModal(false);
      }
    }
  };

  useEffect(() => {
    getPhotoById(modalInfo);
  }, [modalInfo, photoDate]);

  const body = (
    <div className={classes.paper}>
      <ModalCard
        key={photo.id}
        subtitle={photo.subtitle}
        image={photo.file}
        author={photo.author}
        createdAt={photoDate}
        tags={photo.tags}
        collections={photo.collections}
        onClick={() => addPhotoToCollection(photo.id, collectionInput)}
      ></ModalCard>
    </div>
  );

  return (
    <ScreenContainer>
      <Modal open={openModal} onClose={handleClose} disableScrollLock={true}>
        <DialogContent>
          {" "}
          {loadingModal ? (
            <LoaderDiv>
              {" "}
              <Loader />{" "}
            </LoaderDiv>
          ) : (
            body
          )}{" "}
        </DialogContent>
      </Modal>
    </ScreenContainer>
  );
};

export default TransitionsModal;
