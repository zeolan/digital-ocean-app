import React from "react";
import { IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import "../App.css";

const Header: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  return (
    <div className="App-header">
      <div>Тренажер румунських дієслів</div>
      {false && (
        <IconButton>
          {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      )}
    </div>
  );
};

export default Header;
