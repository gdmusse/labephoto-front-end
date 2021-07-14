import { Typography } from "@material-ui/core";
import { useContext } from "react";
import AlertModified from "../../components/Alert";
import Loader from "../../components/Loader";
import GlobalStateContext from "../../global/GlobalStateContext";
import { ScreenContainer,TitleDiv } from "../CreateCollectionPage/styled";
import CreateCollectionForm from "./CreateCollectionForm";

const CreateCollectionPage = () => {
  const {loading} = useContext(GlobalStateContext)

  return (
  <ScreenContainer>
    <AlertModified />
    <TitleDiv> <Typography variant="h4" color="secondary">Create Collection</Typography></TitleDiv>
   
    {loading ? <Loader /> : <CreateCollectionForm />}
  </ScreenContainer>
  )
};

export default CreateCollectionPage;
