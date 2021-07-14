
import { useHistory } from "react-router-dom";
import useProtectedPage from "../../hooks/useProtectedPage";
import { ScreenContainer } from "./styled";

const CollectionsPage = () => {
    useProtectedPage();
    const history = useHistory();
    return (
      <ScreenContainer>
          "a"
      </ScreenContainer>
    );
  };
  
  export default CollectionsPage;
  