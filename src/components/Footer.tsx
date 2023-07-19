import React from "react";
import { Paper } from "@mui/material";

import "../App.scss";

const Footer: React.FC = () => {
  return (
    <Paper elevation={0}>
      <div className="App-footer" color="primary">
        <div className="App-footer-author">Автор: OleksandrZ</div>
        <div className="App-footer-version">
          v{process.env.REACT_APP_VERSION}
        </div>
      </div>
    </Paper>
  );
};

export default Footer;
