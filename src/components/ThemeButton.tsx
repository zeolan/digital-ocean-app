import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { setMode, getMode } from "../store/appSlice.ts";
import { Mode } from "../types.ts";

function ThemeButton() {
  const dispatch = useDispatch();
  const isLightMode = useSelector(getMode) === Mode.light;
  const toggleMode = () => {
    isLightMode ? dispatch(setMode(Mode.dark)) : dispatch(setMode(Mode.light));
  };

  return (
    <IconButton className="App-theme-button" onClick={toggleMode}>
      {isLightMode ? (
        <DarkModeIcon color="primary" />
      ) : (
        <LightModeIcon color="primary" />
      )}
    </IconButton>
  );
}

export default ThemeButton;
