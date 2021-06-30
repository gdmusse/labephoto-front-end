import React, { useEffect, useContext } from "react";
import GlobalStateContext from "../../global/GlobalStateContext";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import { StyledToolbar } from "./styled";
/* import { goToFeed, goToLogin } from "../../routes/coordinator"; */
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();
  const { rightButtonText, setRightButtonText, token } = useContext(
    GlobalStateContext
  );

  const logout = () => {
    localStorage.removeItem("token");
  };

/*   const rightButtonAction = () => {
    if (token) {
      logout();
      setRightButtonText("Login");
       goToLogin(history); 
    } else {
       goToLogin(history); 
    }
  };
 */
/*   useEffect(() => {
    if (token) {
      setRightButtonText("Logout");
    } else {
      setRightButtonText("Login");
    }
  }, [token, setRightButtonText]); */

  return (
    <AppBar position="static">
      <StyledToolbar>
        <Button /* onClick={() => goToFeed(history)} */ color="inherit">
          LabePhoto
        </Button>
        <Button /* onClick={rightButtonAction} */ color="inherit">
          {rightButtonText}
        </Button>
      </StyledToolbar>
    </AppBar>
  );
};

export default Header;
