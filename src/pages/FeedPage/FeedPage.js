import axios from "axios";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import GlobalStateContext from "../../global/GlobalStateContext";
import BASE_URL from "../../constants/urls";
import useProtectedPage from "../../hooks/useProtectedPage";
import { ScreenContainer } from "./styled";
import PhotoCard from "../../components/PhotoCard/PhotoCard";
import Loader from "../../components/Loader";

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
  } = useContext(GlobalStateContext);

  useEffect(() => {
    setLoading(true);
    console.log("photos", photos);
    axios
      .get(`${BASE_URL}/photo/all`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setPhotos(res.data.photos);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .then(() => {
        setLoading(false);
      });
  }, [setPhotos]);

  const photoCards = photos.map((photo) => {
    return <PhotoCard key={photo.id} title={photo.subtitle} />;
  });

  return (
    <ScreenContainer>
      {loading ? <Loader /> : <div>{photoCards}</div>}
    </ScreenContainer>
  );
};

export default FeedPage;
