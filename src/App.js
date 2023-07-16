import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Button, Fab, IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import data from "./data.json";
import { getNextVerb } from "./utils";
import {
  getShowConjugation,
  setShowConjugation,
  getVerb,
  setVerb,
} from "./store/appSlice.ts";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import Verb from "./components/Verb.tsx";
import Conjugation from "./components/Conjugation.tsx";
import "./App.css";

function App() {
  const showConjugation = useSelector(getShowConjugation);
  const dispatch = useDispatch();
  localStorage.setItem("numberOfVerbs", JSON.stringify(data.length));
  localStorage.setItem("version", [process.env.REACT_APP_VERSION]);

  useEffect(() => {
    onNextVerb();
  }, []);

  const onNextVerb = () => {
    const foundVerb = getNextVerb();
    if (foundVerb) {
      dispatch(setVerb(foundVerb));
    }
  };

  const setConjugation = () => {
    dispatch(setShowConjugation(true));
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const defaultTheme = createTheme({
    palette: {
      secondary: {
        light: "#ff7961",
        main: "#ffffff",
        dark: "#ba000d",
        contrastText: "#000",
      },
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <div className="App" justifyContent="space-around">
        {false && (
          <Fab size="small">
            <IconButton>
              {true ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Fab>
        )}
        <Header></Header>
        {showConjugation ? <Conjugation /> : <Verb />}
        {false ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div>
              <Button variant="text" onClick={setConjugation}>
                Спряжение
              </Button>
            </div>
            <div>
              <Button variant="contained" onClick={onNextVerb}>
                Дальше
              </Button>
            </div>
          </div>
        ) : null}

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
