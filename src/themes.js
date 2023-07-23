import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#dddddd",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#444444",
      paper: "#444444",
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
      default: "#eeeeee",
      paper: "#eeeeee",
    },
    text: {
      primary: "#444444",
    },
  },
});
