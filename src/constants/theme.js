import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { primaryColor, neutralColor, deleteColor } from "./colors";

const theme2 = createMuiTheme({
  palette: {
    primary: {
      main: primaryColor,
      contrastText: "white",
    },
    secondary: {
      main: neutralColor,
      contrastText: "white",
    },
    text: {
      primary: neutralColor,
    },
  },
});

const theme = responsiveFontSizes(theme2);

export default theme;
