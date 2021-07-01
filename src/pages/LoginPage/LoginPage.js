import { useHistory } from "react-router-dom";
import AlertModified from "../../components/Alert";
import useProtectedPage from "../../hooks/useProtectedPage";
import LoginForm from "./LoginForm";
import { ScreenContainer, LogoImage, SignUpButtonContainer } from "./styled";
import logo from "../../assets/images/logo.png";
import Button from "@material-ui/core/Button";
import { goToSignUp } from "../../routes/coordinator";

const LoginPage = () => {
  useProtectedPage();
  const history = useHistory();
  return (
    <ScreenContainer>
      <LogoImage src={logo} />
      <LoginForm />
      <AlertModified />
      <SignUpButtonContainer>
        <Button
          type={"submit"}
          fullWidth
          variant={"text"}
          color={"primary"}
          onClick={() => goToSignUp(history)}
        >
          Not registered? Sign up
        </Button>
      </SignUpButtonContainer>
    </ScreenContainer>
  );
};

export default LoginPage;
