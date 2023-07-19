import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#118877",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#333333",
      paper: "#333333",
    },
  },
});

export const defaultTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#118877",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      //default: "#373535",
    },
    text: {
      primary: "#444444",
    },
  },
});
