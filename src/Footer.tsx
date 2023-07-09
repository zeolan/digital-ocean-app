import React from "react";

import "./App.css";

const Footer: React.FC = () => {
  return (
    <div className="App-footer">
      Автор: OleksandrZ
      <div className="App-footer-version">v{process.env.REACT_APP_VERSION}</div>
    </div>
  );
};

export default Footer;
