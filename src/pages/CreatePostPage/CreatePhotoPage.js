import { useContext } from "react";
import AlertModified from "../../components/Alert";
import Loader from "../../components/Loader";
import GlobalStateContext from "../../global/GlobalStateContext";
import { ScreenContainer } from "../FeedPage/styled";
import CreatePhotoForm from "./CreatePhotoForm";

const CreatePhotoPage = () => {
  const {loading} = useContext(GlobalStateContext)

  return (
  <ScreenContainer>
    <AlertModified />
    {loading ? <Loader /> : <CreatePhotoForm />}
  </ScreenContainer>
  )
};

export default CreatePhotoPage;
