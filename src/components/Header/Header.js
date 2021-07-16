import React, { useEffect, useContext } from "react";
import GlobalStateContext from "../../global/GlobalStateContext";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import { AppDiv, LogoDiv, LogoDivTwo, StyledToolbar } from "./styled";
import { goToFeed, goToLogin } from "../../routes/coordinator";
import { useHistory } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import logoloading from "../../assets/images/logoloading.png";
import { makeStyles, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";

const useStyles = makeStyles((theme) => ({
  login: {
    display: "flex",
    color: "#273E47",
    fontWeight: "bold",
    "@media (max-width: 900px)": { paddingRight: "50px" },
    "@media (max-width: 600px)": { paddingRight: "10px" },
  },
  logo: {
    "@media (max-width: 900px)": { paddingLeft: "50px" },
    "@media (max-width: 600px)": { paddingLeft: "10px" },
  },
  bar: {
    boxShadow: "none",
    borderBottom: "1px solid #bbbb",
    margin: "0",
    padding: "0",
  },
  search: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 600px)": { width: "150px" },
  },
  loginDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
}));

const Header = () => {
  const history = useHistory();
  const classes = useStyles();
  const { rightButtonText, setRightButtonText, token } =
    useContext(GlobalStateContext);

  const logout = () => {
    localStorage.removeItem("token");
  };

  const rightButtonAction = () => {
    if (token) {
      logout();
      setRightButtonText("Login");
      goToLogin(history);
    } else {
      goToLogin(history);
    }
  };

  useEffect(() => {
    if (token) {
      setRightButtonText("Logout");
    } else {
      setRightButtonText("Login");
    }
  }, [token, setRightButtonText]);

  return (
    <AppBar position="static" className={classes.bar}>
      <StyledToolbar className={classes.bar}>
        <AppDiv>
          <Button
            onClick={() => goToFeed(history)}
            color="inherit"
            className={classes.logo}
          >
            <LogoDiv src={logo}></LogoDiv>
            <LogoDivTwo src={logoloading}></LogoDivTwo>
          </Button>
        </AppDiv>

        <AppDiv>
          <TextField
            id="outlined-basic"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            className={classes.search}
          />
        </AppDiv>

        <AppDiv className={classes.loginDiv}>
          <Button
            onClick={rightButtonAction}
            color="inherit"
            className={classes.login}
          >
            {rightButtonText}
          </Button>
        </AppDiv>
      </StyledToolbar>
    </AppBar>
  );
};

export default Header;
