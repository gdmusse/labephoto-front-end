import React, { useState } from "react";
import GlobalStateContext from "./GlobalStateContext";

const GlobalState = (props) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const token = localStorage.getItem("token");
  const [rightButtonText, setRightButtonText] = useState("");
  const [loading, setLoading] = useState("");
  const [photos, setPhotos] = useState([]);
  const [modalInfo, setModalInfo] = useState("");
  const [loadingModal, setLoadingModal] = useState("");
  const [collections, setCollections] = useState([]);
  const [collectionDetails, setCollectionDetails] = useState([]);
  const [collectionInput, setCollectionInput] = useState("");
  const [collectionsArray, setCollectionsArray] = useState([]);
  const [logged, setLogged] = useState(false);
  const [profilePhotos, setProfilePhotos] = useState([]);

  return (
    <GlobalStateContext.Provider
      value={{
        openAlert,
        setOpenAlert,
        alertMsg,
        setAlertMsg,
        alertSeverity,
        setAlertSeverity,
        rightButtonText,
        setRightButtonText,
        token,
        loading,
        setLoading,
        photos,
        setPhotos,
        setOpenModal,
        openModal,
        modalInfo,
        setModalInfo,
        loadingModal,
        setLoadingModal,
        collections,
        setCollections,
        collectionDetails,
        setCollectionDetails,
        collectionInput,
        setCollectionInput,
        collectionsArray,
        setCollectionsArray,
        logged,
        setLogged,
        profilePhotos,
        setProfilePhotos,
      }}
    >
      {props.children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalState;
