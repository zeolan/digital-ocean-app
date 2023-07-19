import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import data from "./data.json";
import { getNextVerb } from "./utils";
import {
  getShowConjugation,
  setVerb,
  setMode,
  getMode,
} from "./store/appSlice.ts";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import Verb from "./components/Verb.tsx";
import Conjugation from "./components/Conjugation.tsx";
import "./App.scss";
import { Mode } from "./types.ts";
import { darkTheme, defaultTheme } from "./themes";

function App() {
  const showConjugation = useSelector(getShowConjugation);
  const isLightMode = useSelector(getMode) === Mode.light;
  const dispatch = useDispatch();
  localStorage.setItem("numberOfVerbs", JSON.stringify(data.length));
  localStorage.setItem("version", [process.env.REACT_APP_VERSION]);

  useEffect(() => {
    const foundVerb = getNextVerb();
    if (foundVerb) {
      dispatch(setVerb(foundVerb));
    }
  }, []);

  const toggleMode = () => {
    isLightMode ? dispatch(setMode(Mode.dark)) : dispatch(setMode(Mode.light));
  };

  return (
    <ThemeProvider theme={isLightMode ? defaultTheme : darkTheme}>
      <CssBaseline />
      <div className="App" justifyContent="space-around">
        <IconButton className="App-fab" onClick={toggleMode}>
          {isLightMode ? (
            <DarkModeIcon color="primary" />
          ) : (
            <LightModeIcon color="primary" />
          )}
        </IconButton>
        <Header></Header>
        {showConjugation ? <Conjugation /> : <Verb />}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
