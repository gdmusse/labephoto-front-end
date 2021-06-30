import React, { useContext } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import GlobalStateContext from "../global/GlobalStateContext";

const AlertModified = () => {
  const { openAlert, setOpenAlert, alertMsg, alertSeverity } = useContext(
    GlobalStateContext
  );

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = () => {
    setOpenAlert(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={openAlert}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={alertSeverity}>
        {alertMsg}
      </Alert>
    </Snackbar>
  );
};

export default AlertModified;