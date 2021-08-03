import { Typography } from "@material-ui/core";
import { useContext } from "react";
import AlertModified from "../../components/Alert";
import Loader from "../../components/Loader";
import GlobalStateContext from "../../global/GlobalStateContext";
import { TitleDiv } from "../CreateCollectionPage/styled";
import { ScreenContainer } from "../CreatePostPage/styled";
import CreatePhotoForm from "./CreatePhotoForm";
import useProtectedPage from "../../hooks/useProtectedPage";

const CreatePhotoPage = () => {
  useProtectedPage();
  const { loading } = useContext(GlobalStateContext);

  return (
    <ScreenContainer>
      <AlertModified />
      <TitleDiv>
        {" "}
        <Typography variant="h4" color="secondary">
          Create Photo
        </Typography>
      </TitleDiv>
      {loading ? <Loader /> : <CreatePhotoForm />}
    </ScreenContainer>
  );
};

export default CreatePhotoPage;
