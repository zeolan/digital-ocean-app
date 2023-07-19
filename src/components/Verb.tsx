import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import { Search, Cancel } from "@mui/icons-material";
import TextField from "@mui/material/TextField";

import cx from "classnames";

import data from "../data.json";
import { CapButton, OutlinedButton } from "./MyButtons.js";
import { LightTooltip } from "./MyTooltip.tsx";
import "../App.scss";
import {
  getVerb,
  setVerb,
  setShowConjugation,
  getShowTooltip,
  setShowTooltip,
  getMode,
} from "../store/appSlice.ts";
import { getNextVerb } from "../utils.js";
import { IVerb, Lang, Mode } from "../types.ts";

const Verb: React.FC = () => {
  const dispatch = useDispatch();
  const verb = useSelector(getVerb);
  const isLightMode = useSelector(getMode) === Mode.light;
  const tooltipOpen = useSelector(getShowTooltip);
  const [lang, setLang] = useState<Lang>(Lang.ro);
  const [showSearchInput, setShowSearchInput] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [localNameRu, setLocalNameRu] = useState<string>("");
  const tooltipText = `Натисніть на дієслово щоб подивитись переклад.
     Натисніть ВІДМІНЮВАННЯ щоб подивитися відмінювання дієслова.
     Натисніть ДАЛІ щоб перейти до наступного дієслова.
     Наголос в дієслові позначається рисочкою над буквою`;

  useEffect(() => {
    if (verb) {
      setLang(Lang.ro);
      setTimeout(() => {
        setLocalNameRu(verb.nameRu);
      }, 500);
    }
  }, [verb]);

  const translate = () => {
    dispatch(setShowTooltip(false));
    setShowSearchInput(false);
    lang === Lang.ro ? setLang(Lang.ru) : setLang(Lang.ro);
  };

  const getNameRo = () => {
    if (
      typeof verb.nameRo === "object" &&
      verb.nameRo[0] &&
      verb.nameRo[1] &&
      typeof verb.nameRo[0] === "string" &&
      typeof verb.nameRo[1] === "number"
    ) {
      const name = (verb.nameRo[0] as String).split("");
      let key = 1;
      const result = name.map((item: string) => {
        return key !== verb.nameRo[1] ? (
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
      return <>{result}</>;
    } else {
      return verb.nameRo;
    }
  };

  const hideTooltip = () => {
    dispatch(setShowTooltip(false));
  };

  const onConjugationClick = () => {
    hideTooltip();
    dispatch(setShowConjugation(true));
  };

  const onNextClick = () => {
    hideTooltip();
    setShowSearchInput(false);
    const foundVerb = getNextVerb();
    if (foundVerb) {
      dispatch(setVerb(foundVerb));
    }
  };

  const onSearchClick = () => {
    hideTooltip();
    setShowSearchInput(true);
  };

  const onCancelSearchClick = () => {
    setSearchResults([]);
    setShowSearchInput(false);
  };

  const onListItemClick = (item: IVerb) => {
    setSearchResults([]);
    setShowSearchInput(false);
    dispatch(setVerb(item));
  };

  const onSearchChange = (e: any) => {
    if (e.target.value.length > 1) {
      const searchResults = data.filter((item: any) =>
        item.nameRo[0].includes(e.target.value.toLowerCase())
      );
      setSearchResults(searchResults);
    } else {
      setSearchResults([]);
    }
  };

  return verb ? (
    <div className="App-verb" onClick={hideTooltip}>
      {showSearchInput ? (
        <div className={cx("App-verb-search-block")}>
          <TextField
            variant="standard"
            autoFocus={true}
            onChange={onSearchChange}
            autoComplete="off"
          />
          <IconButton onClick={onCancelSearchClick}>
            <Cancel />
          </IconButton>
          {searchResults.length > 0 ? (
            <div className="App-verb-search-list">
              <List
                style={{
                  backgroundColor: !isLightMode ? "#555555" : "#cccccc",
                }}
              >
                {searchResults.map((option) => (
                  <ListItem
                    key={option.id}
                    value={option.nameRo}
                    disablePadding
                    onClick={() => onListItemClick(option)}
                  >
                    <ListItemText primary={option.nameRo[0]} />
                  </ListItem>
                ))}
              </List>
            </div>
          ) : null}
        </div>
      ) : (
        <>
          <div className="App-verb1">
            <div
              className={cx("button", "App-animate1", {
                rotated: lang === Lang.ru,
              })}
            >
              <LightTooltip title={tooltipText} open={tooltipOpen}>
                <CapButton variant="contained" onClick={translate}>
                  {getNameRo()}
                </CapButton>
              </LightTooltip>
            </div>

            <div
              className={cx("button", "App-animate2", {
                rotated: lang === Lang.ru,
              })}
            >
              <CapButton variant="contained" onClick={translate}>
                {localNameRu}
              </CapButton>
            </div>
          </div>
          <div className="App-verb-buttons">
            <OutlinedButton onClick={onConjugationClick}>
              ВІДМІНЮВАННЯ
            </OutlinedButton>
            <OutlinedButton onClick={onNextClick}>Далі</OutlinedButton>
          </div>
          <div className="App-verb-search-icon">
            <IconButton onClick={onSearchClick}>
              <Search fontSize="large" color="primary" />
            </IconButton>
          </div>
        </>
      )}
    </div>
  ) : (
    <div className="App-verb"></div>
  );
};

export default Verb;
