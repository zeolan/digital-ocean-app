import React, { useState, useEffect } from "react";
import { Button, ButtonGroup } from "@mui/material";

import { Verb } from "./Verb";
import { CapButton, LowCaseButton } from "./MyButtons";
import "./App.css";

const personButtons = [
  <CapButton key="blank" variant="outlined">
    Persona
  </CapButton>,
  <LowCaseButton key="eu">Eu</LowCaseButton>,
  <LowCaseButton key="tu">Tu</LowCaseButton>,
  <LowCaseButton key="el/ea">El/Ea</LowCaseButton>,
  <LowCaseButton key="noi">Noi</LowCaseButton>,
  <LowCaseButton key="voi">Voi</LowCaseButton>,
  <LowCaseButton key="ei/ele">Ei/Ele</LowCaseButton>,
];

interface ConjugationProps {
  verb: Verb;
  onNextClick: () => void;
}

const Conjugation: React.FC<ConjugationProps> = ({ verb, onNextClick }) => {
  const presentButtons = [
    <CapButton key="title" variant="outlined">
      Present
    </CapButton>,
    <LowCaseButton key="eu">{verb.conjugation.eu}</LowCaseButton>,
    <LowCaseButton key="tu">{verb.conjugation.tu}</LowCaseButton>,
    <LowCaseButton key="el">{verb.conjugation.el}</LowCaseButton>,
    <LowCaseButton key="noi">{verb.conjugation.noi}</LowCaseButton>,
    <LowCaseButton key="voi">{verb.conjugation.voi}</LowCaseButton>,
    <LowCaseButton key="ei">{verb.conjugation.ei}</LowCaseButton>,
  ];
  const conjuctivButtons = [
    <CapButton key="title" variant="outlined">
      Conjuctive
    </CapButton>,
    <LowCaseButton key="eu1">{"să " + verb.conjugation.eu1}</LowCaseButton>,
    <LowCaseButton key="tu1">{"să " + verb.conjugation.tu1}</LowCaseButton>,
    <LowCaseButton key="el1">{"să " + verb.conjugation.el1}</LowCaseButton>,
    <LowCaseButton key="noi1">{"să " + verb.conjugation.noi1}</LowCaseButton>,
    <LowCaseButton key="voi1">{"să " + verb.conjugation.voi1}</LowCaseButton>,
    <LowCaseButton key="ei1">{"să " + verb.conjugation.ei1}</LowCaseButton>,
  ];
  const partButtons = [
    <CapButton key="title" variant="outlined">
      Participiu
    </CapButton>,
    <LowCaseButton key="part">{verb.participle}</LowCaseButton>,
  ];
  const impSButtons = [
    <CapButton key="title" variant="outlined">
      Imp.sing.
    </CapButton>,
    <LowCaseButton key="impS">
      {verb.conjugation[verb.impS] || verb.impS}
    </LowCaseButton>,
  ];
  const impPButtons = [
    <CapButton key="title" variant="outlined">
      Imp.plur.
    </CapButton>,
    <LowCaseButton key="impP">
      {verb.conjugation[verb.impP] || verb.impP}
    </LowCaseButton>,
  ];

  return (
    <div className="App-conjugation">
      <div
        style={{
          marginBottom: "30px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ButtonGroup
          style={{ width: "20%" }}
          orientation="vertical"
          className="App-conjugation-btn-group"
          variant="text"
        >
          {personButtons}
        </ButtonGroup>
        <ButtonGroup
          orientation="vertical"
          className="App-conjugation-btn-group"
          variant="text"
        >
          {presentButtons}
        </ButtonGroup>
        <ButtonGroup
          orientation="vertical"
          className="App-conjugation-btn-group"
          variant="text"
        >
          {conjuctivButtons}
        </ButtonGroup>
      </div>
      <div style={{ marginBottom: "30px" }}>
        <ButtonGroup
          orientation="vertical"
          className="App-conjugation-btn-group"
          variant="text"
        >
          {partButtons}
        </ButtonGroup>
        <ButtonGroup
          orientation="vertical"
          className="App-conjugation-btn-group"
          variant="text"
        >
          {impSButtons}
        </ButtonGroup>
        <ButtonGroup
          orientation="vertical"
          className="App-conjugation-btn-group"
          variant="text"
        >
          {impPButtons}
        </ButtonGroup>
      </div>
      <div>
        <Button variant={"contained"} onClick={onNextClick}>
          Дальше
        </Button>
      </div>
    </div>
  );
};

export default Conjugation;
