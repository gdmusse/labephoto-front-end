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
/*   const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10); */

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
        setLoadingModal
/*         currentPage,
        setCurrentPage,
        postsPerPage,
        setPostsPerPage, */
      }}
    >
      {props.children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalState;
