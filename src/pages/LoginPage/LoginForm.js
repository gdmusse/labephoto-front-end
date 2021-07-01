import React, { useContext, useEffect } from "react";
import { InputsContainer, LoginFormContainer } from "./styled";
import TextField from "@material-ui/core/TextField";
import useForm from "../../hooks/useForm";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../constants/urls";
import { goToFeed } from "../../routes/coordinator";
import GlobalStateContext from "../../global/GlobalStateContext";
import Loader from "../../components/Loader";
import { withStyles } from "@material-ui/core";

const LoginForm = () => {
  const history = useHistory();
  const [form, onChange, clear] = useForm({
    nicknameOrEmail: "",
    password: "",
  });

  const { setOpenAlert, setAlertMsg, setAlertSeverity, loading, setLoading } =
    useContext(GlobalStateContext);

  const onSubmitForm = (event) => {
    event.preventDefault();

    let body = form.nicknameOrEmail.includes("@")
      ? {
          email: form.nicknameOrEmail,
          password: form.password,
        }
      : {
          nickname: form.nicknameOrEmail,
          password: form.password,
        };

    login(body, clear, history);
    setLoading(true);
  };

  const login = (body, clear, history) => {
    setLoading(true);

    axios
      .post(`${BASE_URL}/user/login`, body)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        clear();
        setLoading(false);
        goToFeed(history);
      })
      .catch((err) => {
        setLoading(false);
        setAlertMsg(err.response.data.error);
        setAlertSeverity("error");
        setOpenAlert(true);
      });
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <LoginFormContainer>
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={onSubmitForm}>
          <InputsContainer>
            <TextField
              name={"nicknameOrEmail"}
              value={form.nicknameOrEmail}
              onChange={onChange}
              label={"Nickname or Email"}
              variant={"outlined"}
              fullWidth
              margin={"normal"}
              required
              autoFocus
            />
            <TextField
              name={"password"}
              value={form.password}
              onChange={onChange}
              label={"Password"}
              variant={"outlined"}
              fullWidth
              margin={"normal"}
              required
              type={"password"}
              InputProps={{ inputProps: { minLength: 6 } }}
              error={form.password.length < 6}
              helperText={
                form.password.length < 6
                  ? "Password must be at least 6 characters"
                  : " "
              }
            />
          </InputsContainer>
          <Button
            type={"submit"}
            fullWidth
            variant={"contained"}
            color={"primary"}
          >
            Login
          </Button>
        </form>
      )}
    </LoginFormContainer>
  );
};

export default LoginForm;
