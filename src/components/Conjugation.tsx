import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Button, ButtonGroup, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

import { CapButton, LowCaseButton } from "./MyButtons.js";
import { getVerb, setVerb, setShowConjugation } from "../store/appSlice.ts";
import { getNextVerb } from "../utils.js";

const personButtons = [
  <CapButton key="persona" variant="outlined">
    Persona
  </CapButton>,
  <LowCaseButton key="eu">Eu</LowCaseButton>,
  <LowCaseButton key="tu">Tu</LowCaseButton>,
  <LowCaseButton key="el/ea">El/Ea</LowCaseButton>,
  <LowCaseButton key="noi">Noi</LowCaseButton>,
  <LowCaseButton key="voi">Voi</LowCaseButton>,
  <LowCaseButton key="ei/ele">Ei/Ele</LowCaseButton>,
];

const StyledPaper = styled(Paper)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: "15px",
  fontSize: "19px",
  fontWeight: "bolder",
  lineHeight: "1.3em",
}));

const Conjugation: React.FC = () => {
  const verb = useSelector(getVerb);
  const dispatch = useDispatch();

  const getNameRo = (nameRo: any) => {
    if (
      typeof nameRo === "object" &&
      nameRo[0] &&
      nameRo[1] &&
      typeof nameRo[0] === "string" &&
      typeof nameRo[1] === "number"
    ) {
      const name = (nameRo[0] as String).split("");
      let key = 1;
      const result = name.map((item: string) => {
        return key !== nameRo[1] ? (
          item !== " " ? (
            <span key={++key}>{item}</span>
          ) : (
            <span key={++key}>&nbsp;</span>
          )
        ) : (
          <span key={++key} style={{ textDecoration: "overline" }}>
            {item}
          </span>
        );
      });
      return (
        <>
          <span>&nbsp;</span>
          {result}
          <span>&nbsp;</span>
        </>
      );
    } else {
      return nameRo;
    }
  };

  const presentButtons = [
    <CapButton key="title" variant="outlined">
      Present
    </CapButton>,
    <LowCaseButton key="eu">{getNameRo(verb.conjugation.eu)}</LowCaseButton>,
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
    <LowCaseButton key="part" sx={{ pl: "5px", pr: "5px" }}>
      {verb.participle}
    </LowCaseButton>,
  ];
  const impSButtons = [
    <CapButton key="title" variant="outlined">
      Imp.sing.
    </CapButton>,
    <LowCaseButton key="impS" sx={{ pl: "5px", pr: "5px" }}>
      {verb.conjugation[verb.impS] || verb.impS}
    </LowCaseButton>,
  ];
  const impPButtons = [
    <CapButton key="title" variant="outlined">
      Imp.plur.
    </CapButton>,
    <LowCaseButton key="impP" sx={{ pl: "5px", pr: "5px" }}>
      {verb.conjugation[verb.impP] || verb.impP}
    </LowCaseButton>,
  ];

  const onNextClick = () => {
    dispatch(setVerb(getNextVerb()));
    dispatch(setShowConjugation(false));
  };

  return (
    <div className="App-conjugation">
      <StyledPaper elevation={0}>
        <span>a&nbsp;</span>
        {getNameRo(verb.nameRo)}
        <span>- {verb.nameRu}</span>
      </StyledPaper>
      <div className="App-conjugation-block2">
        <ButtonGroup orientation="vertical" variant="text">
          {personButtons}
        </ButtonGroup>
        <ButtonGroup orientation="vertical" variant="text">
          {presentButtons}
        </ButtonGroup>
        <ButtonGroup orientation="vertical" variant="text">
          {conjuctivButtons}
        </ButtonGroup>
      </div>
      <div className="App-conjugation-block3">
        <ButtonGroup orientation="vertical" variant="text">
          {partButtons}
        </ButtonGroup>
        <ButtonGroup orientation="vertical" variant="text">
          {impSButtons}
        </ButtonGroup>
        <ButtonGroup orientation="vertical" variant="text">
          {impPButtons}
        </ButtonGroup>
      </div>
      <div className="App-conjugation-block4">
        <Button variant={"contained"} onClick={onNextClick}>
          Далі
        </Button>
      </div>
    </div>
  );
};

export default Conjugation;
