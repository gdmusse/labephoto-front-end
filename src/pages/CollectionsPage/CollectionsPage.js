import axios from "axios";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import BASE_URL from "../../constants/urls";
import GlobalStateContext from "../../global/GlobalStateContext";
import useProtectedPage from "../../hooks/useProtectedPage";
import { goToLogin } from "../../routes/coordinator";
import { ScreenContainer } from "./styled";
import CollectionCard from "../../components/CollectionCard/CollectionCard";
import Loader from "../../components/Loader";
import AlertModified from "../../components/Alert";

const CollectionsPage = () => {
  useProtectedPage();
  const history = useHistory();
  const {
    loading,
    setLoading,
    collections,
    setCollections,
    setAlertMsg,
    setAlertSeverity,
    setOpenAlert,
  } = useContext(GlobalStateContext);

  useEffect(() => {
    setLoading(true);
    getCollections();
  }, []);

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
      if (err.response.data.error.includes("jwt expired")) {
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

  const collectionCards = collections ? (
    collections
      .sort((a, b) => {
        const date1 = dayjs(a.date);
        const date2 = dayjs(b.date);
        return date2 - date1;
      })
      .map((collection) => {
        let fixedDate = dayjs(collection.date).format("DD/MM/YYYY HH:mm");
        if (!collection.image) {
          collection.image =
            "https://www.aidforwomen.org/wp-content/uploads/2020/10/image-placeholder-500x500-1.jpg";
        }
        return (
          <CollectionCard
            key={collection.id}
            id={collection.id}
            title={collection.title}
            image={collection.image}
            subtitle={collection.subtitle}
            date={fixedDate}
          />
        );
      })
  ) : (
    <div>You haven't created a collection yet.</div>
  );

  return (
    <ScreenContainer>
      <AlertModified /> {loading ? <Loader /> : <div>{collectionCards}</div>}
    </ScreenContainer>
  );
};

export default CollectionsPage;
