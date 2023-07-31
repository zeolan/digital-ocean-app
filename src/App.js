import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import data from "./data.json";
import { getRandomVerbsOrder } from "./utils.ts";
import {
  getShowConjugation,
  setVerb,
  getMode,
  setVerbsOrder,
  setVerbIdx,
  setNumberOfVerbs,
} from "./store/appSlice.ts";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import Verb from "./components/Verb.tsx";
import ThemeButton from "./components/ThemeButton.tsx";
import Conjugation from "./components/Conjugation.tsx";
import "./styles/App.scss";
import { Mode } from "./types.ts";
import { darkTheme, defaultTheme } from "./themes";

function App() {
  const showConjugation = useSelector(getShowConjugation);
  const isLightMode = useSelector(getMode) === Mode.light;
  const dispatch = useDispatch();
  const numberOfVerbs = data.length;
  localStorage.setItem("numberOfVerbs", JSON.stringify(numberOfVerbs));
  localStorage.setItem("version", [process.env.REACT_APP_VERSION]);

  useEffect(() => {
    const verbsOrder = getRandomVerbsOrder(numberOfVerbs);
    dispatch(setNumberOfVerbs(numberOfVerbs));
    if (verbsOrder.length) {
      dispatch(setVerbsOrder(verbsOrder));
      const initialIndex = verbsOrder[0];
      dispatch(setVerbIdx(0));
      const initialVerb = data.find((verb) => verb.id === initialIndex);
      if (initialVerb) {
        dispatch(setVerb(initialVerb));
      }
    }
  }, []);

  return (
    <ThemeProvider theme={isLightMode ? defaultTheme : darkTheme}>
      <CssBaseline />
      <div className="App">
        <ThemeButton />
        <Header />
        {showConjugation ? <Conjugation /> : <Verb />}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
