import axios from "axios";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import GlobalStateContext from "../../global/GlobalStateContext";
import BASE_URL from "../../constants/urls";
import useProtectedPage from "../../hooks/useProtectedPage";
import { ScreenContainer, AddPostButton } from "./styled";
import PhotoCard from "../../components/PhotoCard/PhotoCard";
import Loader from "../../components/Loader";
import TransitionsModal from "../../components/Modal";
import { goToCreatePhotoPage, goToLogin } from "../../routes/coordinator";
import AlertModified from "../../components/Alert";
import { Add } from "@material-ui/icons";

const FeedPage = () => {
  useProtectedPage();
  const history = useHistory();
  const {
    loading,
    setLoading,
    photos,
    setPhotos,
    setAlertMsg,
    setAlertSeverity,
    setOpenAlert,
    setOpenModal,
    setModalInfo,
    modalInfo,
  } = useContext(GlobalStateContext);

  useEffect(() => {
    setLoading(true);
    getPhotos();
  }, []);

  const getPhotos = async () => {
    try {
      await axios
        .get(`${BASE_URL}/photo/all`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setPhotos(res.data.photos);
        });
    } catch (err) {
      if (err.response.data.error.includes("jwt expired")) {
        setAlertMsg(err.response.data.error);
        setAlertSeverity("error");
        setOpenAlert(true);
        goToLogin(history);
      }
    } finally {
      setLoading(false);
    }
  };

  const onClickModal = (id) => {
    setOpenModal(true);
    setModalInfo(id);
  };
console.log("before", photos)
  const photoCards = photos
    .sort((a, b) => {
      return b.date - a.date;
    })
    .map((photo) => {
      return (
        <PhotoCard
          key={photo.id}
          subtitle={photo.subtitle}
          image={photo.file}
          onClickCard={() => onClickModal(photo.id)}
        />
      );
    });
    console.log("after", photos)
  return (
    <ScreenContainer>
      <TransitionsModal />
      <AlertModified />
      {loading ? <Loader /> : <div>{photoCards}</div>}
      <AddPostButton
        color={"primary"}
        onClick={() => goToCreatePhotoPage(history)}
      >
        <Add />
      </AddPostButton>
    </ScreenContainer>
  );
};

export default FeedPage;
