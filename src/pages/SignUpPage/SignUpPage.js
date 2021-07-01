import React from "react";
import { ScreenContainer, LogoImage } from "./styled";
import logo from "../../assets/images/logo.png";
import SignUpForm from "./SignUpForm";
import useUnprotectedPage from "../../hooks/useUnprotectedPage";
import AlertModified from "../../components/Alert";
import { goToPreviousPage } from "../../routes/coordinator";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const SignUpPage = () => {
  useUnprotectedPage();
  const history = useHistory();
  return (
    <ScreenContainer>
      <LogoImage src={logo} />
      <SignUpForm />
      <Button
        type={"submit"}
        variant={"text"}
        color={"primary"}
        onClick={() => goToPreviousPage(history)}
      >
        Back
      </Button>
      <AlertModified />
    </ScreenContainer>
  );
};

export default SignUpPage;
