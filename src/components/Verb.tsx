import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import { Search, Cancel } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import cx from "classnames";

import data from "../data.json";
import { OutlinedButton, VerbButton } from "./MyButtons.js";
import { LightTooltip } from "./MyTooltip.tsx";
import {
  getVerb,
  setVerb,
  setShowConjugation,
  getShowTooltip,
  setShowTooltip,
  getMode,
  setVerbIdx,
  getVerbIdx,
  getVerbsOrder,
} from "../store/appSlice.ts";
import { getVerbByIdx } from "../utils.ts";
import { IVerb, Lang, Mode } from "../types.ts";

const Verb: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const verb = useSelector(getVerb);
  const verbIdx = useSelector(getVerbIdx);
  const verbsOrder = useSelector(getVerbsOrder);
  const isLightMode = useSelector(getMode) === Mode.light;
  const tooltipOpen = useSelector(getShowTooltip);
  const [lang, setLang] = useState<Lang>(Lang.ro);
  const [searchLang, setSearchLang] = useState<Lang>(Lang.ro);
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
      const name = verb.nameRo[0].split("");
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
    let idx = verbIdx + 1;
    if (idx >= verbsOrder.length) {
      idx = 0;
    }
    dispatch(setVerbIdx(idx));
    const foundVerb = getVerbByIdx(data, verbsOrder[idx]);
    if (foundVerb) {
      dispatch(setVerb(foundVerb));
    }
  };

  const onPrevClick = () => {
    hideTooltip();
    setShowSearchInput(false);
    let idx = verbIdx - 1;
    if (verbIdx <= 0) {
      idx = verbsOrder.length - 1;
    }
    dispatch(setVerbIdx(idx));
    const foundVerb = getVerbByIdx(data, verbsOrder[idx]);
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
      const searchResultsRo = data.filter((item: any) =>
        item.nameRo[0].includes(e.target.value.toLowerCase())
      );
      const searchResultsRu = data.filter((item: any) =>
        item.nameRu.includes(e.target.value.toLowerCase())
      );
      const searchResults = searchResultsRo.length
        ? searchResultsRo
        : searchResultsRu;
      const searchLang = searchResultsRo.length ? Lang.ro : Lang.ru;
      setSearchLang(searchLang);
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
                    <ListItemText
                      primary={
                        searchLang === Lang.ro
                          ? option.nameRo[0]
                          : option.nameRu
                      }
                      sx={{ borderBottom: "1px solid #aaaaaa" }}
                    />
                  </ListItem>
                ))}
              </List>
            </div>
          ) : null}
        </div>
      ) : (
        <>
          <div className="App-verb-block1">
            <div
              className={cx("App-verb-block1-button", "front", {
                rotated: lang === Lang.ru,
              })}
            >
              <LightTooltip
                title={tooltipText}
                open={tooltipOpen}
                className="App-verb-tooltip"
              >
                <VerbButton variant="contained" onClick={translate}>
                  {getNameRo()}
                </VerbButton>
              </LightTooltip>
            </div>

            <div
              className={cx("App-verb-block1-button", "back", {
                rotated: lang === Lang.ru,
              })}
            >
              <VerbButton
                variant="contained"
                onClick={translate}
                sx={{ pt: "7px" }}
              >
                {localNameRu}
              </VerbButton>
            </div>
          </div>
          <div className="App-verb-buttons">
            <OutlinedButton
              onClick={onPrevClick}
              startIcon={<ArrowBackIcon />}
              sx={{ borderColor: theme.palette.primary.main }}
            ></OutlinedButton>
            <OutlinedButton
              onClick={onConjugationClick}
              sx={{ borderColor: theme.palette.primary.main }}
            >
              ВІДМІНЮВАННЯ
            </OutlinedButton>
            <OutlinedButton
              onClick={onNextClick}
              endIcon={<ArrowForwardIcon />}
              sx={{ borderColor: theme.palette.primary.main }}
            ></OutlinedButton>
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
