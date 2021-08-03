import axios from "axios";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import BASE_URL from "../../constants/urls";
import GlobalStateContext from "../../global/GlobalStateContext";
import useProtectedPage from "../../hooks/useProtectedPage";
import { goToLogin } from "../../routes/coordinator";
import { ButtonDiv, ScreenContainer, TitleDiv } from "./styled";
import Loader from "../../components/Loader";
import PhotoCard from "../../components/PhotoCard/PhotoCard";
import TransitionsModal from "../../components/Modal";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AlertModified from "../../components/Alert";

const useStyles = makeStyles((theme) => ({
  removeButton: {
    backgroundColor: "#bf3732",
    "&:hover": {
      background: "#9b2b27",
    },
  },
}));

const CollectionDetailsPage = () => {
  useProtectedPage();

  const params = useParams();
  const classes = useStyles();

  const history = useHistory();
  const {
    loading,
    setLoading,
    collectionDetails,
    setCollectionDetails,
    setAlertMsg,
    setAlertSeverity,
    setOpenAlert,
    setOpenModal,
    setModalInfo,
  } = useContext(GlobalStateContext);

  useEffect(() => {
    setLoading(true);
    setCollectionDetails([]);

    getCollectionDetails();
  }, [params]);

  const getCollectionDetails = async () => {
    try {
      await axios
        .get(`${BASE_URL}/photo/collection/${params.id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setCollectionDetails(res.data.photos);
        });
    } catch (err) {
      if (err.response.data.error.includes("jwt expired")) {
        setAlertMsg(err.response.data.error);
        setAlertSeverity("error");
        setOpenAlert(true);
        goToLogin(history);
      } else {
        console.log(err.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  const onClickModal = (id) => {
    setOpenModal(true);
    setModalInfo(id);
  };

  const removePhotoFromCollection = async (id) => {
    try {
      await axios
        .delete(`${BASE_URL}/photo/${params.id}/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setAlertMsg("Photo removed from collection successfully");
          setAlertSeverity("success");
          setOpenAlert(true);
          getCollectionDetails();
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

  const collectionCards = collectionDetails
    .sort((a, b) => {
      const date1 = dayjs(a.date);
      const date2 = dayjs(b.date);
      return date2 - date1;
    })
    .map((photo) => {
      return (
        <div>
          <PhotoCard
            key={photo.photo_id}
            subtitle={photo.subtitle}
            image={photo.file}
            author={photo.author}
            onClickCard={() => onClickModal(photo.photo_id)}
          />

          <ButtonDiv>
            {" "}
            <Button
              variant="contained"
              color="primary"
              size="small"
              disableElevation={true}
              className={classes.removeButton}
              onClick={() => removePhotoFromCollection(photo.photo_id)}
            >
              Remove Photo
            </Button>
          </ButtonDiv>
        </div>
      );
    });

  return (
    <ScreenContainer>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {collectionDetails[0] && collectionDetails[0].collection_title ? (
            <TitleDiv>
              {" "}
              <Typography variant="h4" color="secondary" align="center">
                {collectionDetails[0].collection_title}
              </Typography>
            </TitleDiv>
          ) : (
            <div>No photo was added to this collection yet.</div>
          )}
          {collectionCards}
          <AlertModified />
        </div>
      )}
      <TransitionsModal></TransitionsModal>
    </ScreenContainer>
  );
};

export default CollectionDetailsPage;
