import React, { useContext } from "react";
import { InputsContainer, SignUpFormContainer } from "./styled";
import TextField from "@material-ui/core/TextField";
import useForm from "../../hooks/useForm";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../constants/urls";
import { goToFeed } from "../../routes/coordinator";
import GlobalStateContext from "../../global/GlobalStateContext";
import Loader from "../../components/Loader";

const SignUpForm = () => {
  const history = useHistory();
  const [form, onChange, clear] = useForm({
    name: "",
    nickname: "",
    email: "",
    password: "",
  });

  const { setOpenAlert, setAlertMsg, setAlertSeverity, loading, setLoading } =
    useContext(GlobalStateContext);

  const onSubmitForm = (event) => {
    event.preventDefault();
    signUp(form, clear, history);
    setLoading(true);
  };

  const signUp = (body, clear, history) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/user/signup`, body)
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

  return (
    <SignUpFormContainer>
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={onSubmitForm}>
          <InputsContainer>
            <TextField
              name={"name"}
              value={form.name}
              onChange={onChange}
              label={"Name"}
              variant={"outlined"}
              fullWidth
              margin={"normal"}
              required
              autoFocus
            />
            <TextField
              name={"nickname"}
              value={form.nickname}
              onChange={onChange}
              label={"Nickname"}
              variant={"outlined"}
              fullWidth
              margin={"normal"}
              required
              autoFocus
            />
            <TextField
              name={"email"}
              value={form.email}
              onChange={onChange}
              label={"E-mail"}
              variant={"outlined"}
              fullWidth
              margin={"normal"}
              required
              type={"email"}
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
            Sign Up
          </Button>
        </form>
      )}
    </SignUpFormContainer>
  );
};

export default SignUpForm;
