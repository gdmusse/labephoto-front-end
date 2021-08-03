import React, { useEffect, useContext, useState } from "react";
import GlobalStateContext from "../../global/GlobalStateContext";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import {
  AppDiv,
  LogoDiv,
  LogoDivTwo,
  SearchDiv,
  StyledToolbar,
} from "./styled";
import {
  goToFeed,
  goToLogin,
  goToProfilePage,
  goToSearchPage,
} from "../../routes/coordinator";
import { useHistory } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import logoloading from "../../assets/images/logoloading.png";
import { IconButton, makeStyles, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Autocomplete } from "@material-ui/lab";
import { AccountCircle } from "@material-ui/icons";

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
  const {
    rightButtonText,
    setRightButtonText,
    token,
    setOpenAlert,
    setAlertMsg,
    setAlertSeverity,
    setLogged,
    logged,
  } = useContext(GlobalStateContext);
  const [searchValue, setSearchValue] = useState("");

  const options = [
    `${searchValue} in subtitle`,
    `${searchValue} in author`,
    `${searchValue} in tags`,
  ];
  const [value, setValue] = useState("");

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
      setLogged(true);
    } else {
      setRightButtonText("Login");
      setLogged(false);
    }
  }, [token, setRightButtonText]);

  const onChange = (e) => {
    setSearchValue(e.target.value);
  };

  const goToSearchPageFunction = () => {
    if (value.length > 0) {
      const valueNew = value.replace(/ /g, "");
      setValue("");
      setSearchValue("");
      goToSearchPage(history, valueNew);
    } else {
      setAlertMsg("Please input at least 1 character and category to search");
      setAlertSeverity("error");
      setOpenAlert(true);
    }
  };

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
          {token ? (
            <SearchDiv>
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                options={options}
                className={classes.search}
                fullWidth
                disableClearable
                forcePopupIcon={false}
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search"
                    onChange={onChange}
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="search"
                            onClick={goToSearchPageFunction}
                            edge="end"
                          >
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              ></Autocomplete>
            </SearchDiv>
          ) : (
            <div></div>
          )}
        </AppDiv>

        <AppDiv className={classes.loginDiv}>
          {logged ? (
            <Button onClick={() => goToProfilePage(history)}>
              <AccountCircle />
            </Button>
          ) : (
            <div></div>
          )}

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
