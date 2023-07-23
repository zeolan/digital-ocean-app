import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import data from "./data.json";
import { getNextVerb } from "./utils";
import { getShowConjugation, setVerb, getMode } from "./store/appSlice.ts";
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
  localStorage.setItem("numberOfVerbs", JSON.stringify(data.length));
  localStorage.setItem("version", [process.env.REACT_APP_VERSION]);

  useEffect(() => {
    const foundVerb = getNextVerb();
    if (foundVerb) {
      dispatch(setVerb(foundVerb));
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
