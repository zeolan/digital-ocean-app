import React from "react";

import "../App.css";

const Footer: React.FC = () => {
  return (
    <div className="App-footer">
      <div className="App-footer-author">Автор: OleksandrZ</div>
      <div className="App-footer-version">v{process.env.REACT_APP_VERSION}</div>
    </div>
  );
};

export default Footer;
