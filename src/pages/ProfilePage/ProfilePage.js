import React, { useContext, useEffect } from "react";
import { ScreenContainer, PhotosContainer, TitleDiv } from "./styled";
import useProtectedPage from "../../hooks/useProtectedPage";
import AlertModified from "../../components/Alert";
import { useHistory } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../constants/urls";
import GlobalStateContext from "../../global/GlobalStateContext";
import { goToLogin } from "../../routes/coordinator";
import Loader from "../../components/Loader";
import dayjs from "dayjs";
import TransitionsModal from "../../components/Modal";
import jwt from "jsonwebtoken";
import { Typography } from "@material-ui/core";
import PhotoCardEdit from "../../components/PhotoCardEdit/PhotoCardEdit";

const ProfilePage = () => {
  useProtectedPage();
  const history = useHistory();
  const {
    loading,
    setLoading,
    profilePhotos,
    setProfilePhotos,
    setAlertMsg,
    setAlertSeverity,
    setOpenAlert,
    setOpenModal,
    setModalInfo,
    setCollectionsArray,
    collections,
    setCollections,
  } = useContext(GlobalStateContext);

  useEffect(() => {
    setLoading(true);
    getPhotos();
    getCollections();
  }, []);

  const getPhotos = async () => {
    const tokenInfo = jwt.verify(
      localStorage.getItem("token"),
      "parangaricutirrimiruaro"
    );
    const tokenId = tokenInfo.id;
    try {
      await axios
        .get(`${BASE_URL}/photo/user/${tokenId}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setProfilePhotos(res.data.photo);
        });
    } catch (err) {
      if (err.response && err.response.data.error.includes("jwt expired")) {
        localStorage.removeItem("token");
        setAlertMsg(err.response.data.error);
        setAlertSeverity("error");
        setOpenAlert(true);
        goToLogin(history);
      } else {
        console.log(err.response.data.error);
      }
    } finally {
    }
  };

  const getCollections = async () => {
    try {
      await axios
        .get(`${BASE_URL}/collection`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setCollections(res.data.collections);
        });
    } catch (err) {
      if (err.response && err.response.data.error.includes("jwt expired")) {
        setAlertMsg(err.response.data.error);
        setAlertSeverity("error");
        setOpenAlert(true);
        goToLogin(history);
      } else {
        console.log("err", err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCollectionsArray([]);
    collections &&
      collections.map((collection) => {
        const newCollection = {
          value: `${collection.id}`,
          label: `${collection.title}`,
        };
        setCollectionsArray((collectionsArray) => [
          ...collectionsArray,
          newCollection,
        ]);
        return null;
      });
  }, [collections]);

  const onClickModal = (id) => {
    setOpenModal(true);
    setModalInfo(id);
  };

  const removePhoto = async (id) => {
    try {
      await axios
        .delete(`${BASE_URL}/photo/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setAlertMsg("Photo deleted successfully");
          setAlertSeverity("success");
          setOpenAlert(true);
          getPhotos();
        });
    } catch (err) {
      if (err.response && err.response.data.error.includes("jwt expired")) {
        setAlertMsg(err.response.data.error);
        setAlertSeverity("error");
        setOpenAlert(true);
      } else {
        console.log("err", err);
      }
    } finally {
      setLoading(false);
    }
  };

  const photoCards =
    profilePhotos &&
    profilePhotos
      .sort((a, b) => {
        const date1 = dayjs(a.date);
        const date2 = dayjs(b.date);
        return date2 - date1;
      })
      .map((photo) => {
        return (
          <PhotoCardEdit
            key={photo.id}
            subtitle={photo.subtitle}
            image={photo.file}
            author={photo.author}
            onClickCard={() => onClickModal(photo.id)}
            onClickRemove={() => removePhoto(photo.id)}
          />
        );
      });

  return (
    <ScreenContainer>
      <AlertModified />
      <TitleDiv>
        <Typography variant="h4" color="secondary">
          My Photos
        </Typography>
      </TitleDiv>

      <PhotosContainer>
        <TransitionsModal />

        {loading ? <Loader /> : <div>{photoCards}</div>}
      </PhotosContainer>
    </ScreenContainer>
  );
};

export default ProfilePage;
