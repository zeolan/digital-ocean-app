import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { getRandomVerbsOrder, getSortedVerbsOrder } from "./utils/utils.ts";
import {
  getVerbs,
  getShowConjugation,
  setVerb,
  getMode,
  setVerbsOrder,
  setVerbIdx,
  getVerbIdx,
  setNumberOfVerbs,
  getSortVerbs,
} from "./store/reducer.ts";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import Verb from "./components/Verb.tsx";
import ThemeButton from "./components/ThemeButton.tsx";
import SettingsButton from "./components/SettingsButton.tsx";
import Conjugation from "./components/Conjugation.tsx";
import TermsOfUseModal from "./components/TermsOfUseModal.tsx";
import "./styles/App.scss";
import { Mode } from "./types.ts";
import { darkTheme, defaultTheme } from "./themes.js";

function App() {
  const verbs = useSelector(getVerbs);
  const sortVerbs = useSelector(getSortVerbs);
  const lastVerbIdx = useSelector(getVerbIdx);
  const showConjugation = useSelector(getShowConjugation);
  const isLightMode = useSelector(getMode) === Mode.light;
  const dispatch = useDispatch();
  const numberOfVerbs = verbs.length;
  localStorage.setItem("numberOfVerbs", JSON.stringify(numberOfVerbs));
  //localStorage.setItem("version", [process.env.REACT_APP_VERSION]);

  useEffect(() => {
    if (sortVerbs) {
      const verbsOrder = getSortedVerbsOrder(verbs);
      dispatch(setVerbsOrder(verbsOrder));

      let lastVerb = verbs.find((verb) => verb.id === verbsOrder[lastVerbIdx]);
      if (!lastVerb) {
        lastVerb = verbs.find((verb) => verb.id === verbsOrder[0]);
        dispatch(setVerbIdx(0));
      }
      dispatch(setVerb(lastVerb));
    } else {
      const verbsOrder = getRandomVerbsOrder(numberOfVerbs);
      dispatch(setNumberOfVerbs(numberOfVerbs));
      if (verbsOrder.length) {
        dispatch(setVerbsOrder(verbsOrder));
        const initialIndex = verbsOrder[0];
        dispatch(setVerbIdx(0));
        const initialVerb = verbs.find((verb) => verb.id === initialIndex);
        if (initialVerb) {
          dispatch(setVerb(initialVerb));
        }
      }
    }
  }, []);

  return (
    <ThemeProvider theme={isLightMode ? defaultTheme : darkTheme}>
      <CssBaseline />
      <div className="App">
        <SettingsButton />
        <ThemeButton />
        <Header />
        {showConjugation ? <Conjugation /> : <Verb />}
        <Footer />
      </div>
      <TermsOfUseModal />
    </ThemeProvider>
  );
}

export default App;
