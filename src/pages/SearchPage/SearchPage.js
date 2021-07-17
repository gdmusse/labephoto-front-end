import axios from "axios";
import { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import GlobalStateContext from "../../global/GlobalStateContext";
import BASE_URL from "../../constants/urls";
import useProtectedPage from "../../hooks/useProtectedPage";
import { ScreenContainer, PhotosContainer, ButtonsContainer } from "./styled";
import PhotoCard from "../../components/PhotoCard/PhotoCard";
import Loader from "../../components/Loader";
import TransitionsModal from "../../components/Modal";
import {
  goToLogin,
  goToCreatePhotoPage,
  goToCreateCollectionPage,
  goToCollectionsPage,
} from "../../routes/coordinator";
import AlertModified from "../../components/Alert";
import { AddAPhoto, AddPhotoAlternate, Collections } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import dayjs from "dayjs";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  buttons: {
    margin: theme.spacing(1),
    "@media (max-width: 600px)": { padding: "0" },
  },
  middlebutton: {
    margin: "0px 10px",
    "@media (max-width: 600px)": { margin: "0px 2px", padding: "5px" },
  },
  lastbutton: {
    "@media (max-width: 600px)": { padding: "15px" },
  },
}));

const SearchPage = () => {
  useProtectedPage()
  const params = useParams();
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
    setCollectionsArray,
    collections,
    setCollections,
  } = useContext(GlobalStateContext);

  const classes = useStyles();

  useEffect(() => {
    setPhotos([]);
    setLoading(true);
    getPhotos();
    getCollections();
  }, [params]);

  const getPhotos = async () => {
    try {
      const searchParams = params.search.includes("insubtitle")? {subtitle: `${params.search.split("insubtitle")[0]}`}
      : params.search.includes("inauthor")? {author: `${params.search.split("inauthor")[0]}`} 
      : {tag: `${params.search.split("intags")[0]}`} 
      
      await axios
        .get(`${BASE_URL}/photo/search`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          }, 
          params: searchParams
        })
        .then((res) => {
          setPhotos(res.data.photo);
        });
    } catch (err) {
      if (err.response && err.response.data.error.includes("jwt expired")) {
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

  const photoCards = photos.length > 0 ? (photos.sort((a, b) => {
    const date1 = dayjs(a.date);
    const date2 = dayjs(b.date);
    return date2 - date1;
  })
  .map((photo) => {
    return (
      <PhotoCard
        key={photo.id}
        subtitle={photo.subtitle}
        image={photo.file}
        author={photo.author}
        onClickCard={() => onClickModal(photo.id)}
      />
    );
  })) : (<div>Sorry! No photo was found.</div>)
   

  return (
    <ScreenContainer>
      <ButtonsContainer className={classes.buttons}>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => goToCreatePhotoPage(history)}
          disableElevation={true}
        >
          <AddAPhoto className={classes.extendedIcon} />
          Add Photo
        </Button>

        <Button
          onClick={() => goToCreateCollectionPage(history)}
          variant="contained"
          color="secondary"
          size="small"
          disableElevation={true}
          className={classes.middlebutton}
        >
          <AddPhotoAlternate className={classes.extendedIcon} />
          Add Collection
        </Button>

        <Button
          onClick={() => goToCollectionsPage(history)}
          variant="contained"
          color="secondary"
          size="small"
          disableElevation={true}
          className={classes.lastbutton}
        >
          <Collections className={classes.extendedIcon} />
          Collections
        </Button>
      </ButtonsContainer>
      <PhotosContainer>
        <TransitionsModal />
        <AlertModified />
        {loading ? <Loader /> : <div>{photoCards}</div>}
      </PhotosContainer>
    </ScreenContainer>
  );
};

export default SearchPage;
