import axios from "axios";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import GlobalStateContext from "../../global/GlobalStateContext";
import BASE_URL from "../../constants/urls";
import useProtectedPage from "../../hooks/useProtectedPage";
import { ScreenContainer } from "./styled";
import PhotoCard from "../../components/PhotoCard/PhotoCard";
import Loader from "../../components/Loader";
import TransitionsModal from "../../components/Modal";

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
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onClickModal = (id) => {
    setOpenModal(true);
    setModalInfo(id);
  };

  const photoCards = photos.map((photo) => {
    return (
      <PhotoCard
        key={photo.id}
        subtitle={photo.subtitle}
        image={photo.file}
        onClickCard={() => onClickModal(photo.id)}
      />
    );
  });

  return (
    <ScreenContainer>
      <TransitionsModal />
      {loading ? <Loader /> : <div>{photoCards}</div>}
    </ScreenContainer>
  );
};

export default FeedPage;
