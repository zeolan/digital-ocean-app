import React, { useState, useEffect } from "react";

import "./App.css";
import { Button, Fab, IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import data from "./data.json";
import useLocalStorage from "./useLocalStorage";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import Verb from "./Verb.tsx";
import Conjugation from "./Conjugation.tsx";

function App() {
  const [verb, setVerb] = useState({ conjugation: {} });
  const [showConjugation, setShowConjugation] = useState(false);
  let locStorage = useLocalStorage();
  const numberOfVerbs = data.length;
  localStorage.setItem("numberOfVerbs", JSON.stringify(numberOfVerbs));
  localStorage.setItem("version", [process.env.REACT_APP_VERSION]);

  useEffect(() => {
    onNextVerb();
  }, []);

  const onNextVerb = () => {
    let verbId = 0;
    let cnt = 0;
    while (cnt < numberOfVerbs * 10) {
      verbId = (Math.random() * (numberOfVerbs - 1)).toFixed(0).toString();
      if (!locStorage.includes(verbId)) {
        locStorage.push(verbId);
        break;
      }
      cnt++;
    }
    if (cnt >= numberOfVerbs) {
      locStorage = [verbId];
    }

    localStorage.setItem("verbs", JSON.stringify(locStorage));
    setShowConjugation(false);
    const foudVerb = data.find((verb) => {
      return verb.id === parseInt(verbId);
    });
    foudVerb && setVerb(foudVerb);
  };

  const setConjugation = () => {
    setShowConjugation(true);
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
        {showConjugation ? (
          <Conjugation verb={verb} onNextClick={onNextVerb} />
        ) : (
          <Verb
            verb={verb}
            onNextClick={onNextVerb}
            onConjClick={setConjugation}
          />
        )}
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
              <Button
                variant={showConjugation ? "contained" : "text"}
                onClick={onNextVerb}
              >
                Дальше
              </Button>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
