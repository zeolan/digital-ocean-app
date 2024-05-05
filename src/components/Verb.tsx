import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import { Search, Close } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BackspaceIcon from "@mui/icons-material/Backspace";
import TextField from "@mui/material/TextField";
//import InputLabel from "@mui/material/InputLabel";
//import Card from "@mui/material/Card";
//import CardContent from "@mui/material/CardContent";
import InputAdornment from "@mui/material/InputAdornment";
import { useTheme } from "@mui/material/styles";
import cx from "classnames";

import { OutlinedButton, VerbButton } from "./MyButtons.js";
import { LightTooltip } from "./MyTooltip.tsx";
import {
  getVerbs,
  getVerb,
  setVerb,
  setShowConjugation,
  getShowTooltip,
  setShowTooltip,
  getMode,
  setVerbIdx,
  getVerbIdx,
  getVerbsOrder,
  getFromLang,
} from "../store/reducer.ts";
import { getVerbByIdx } from "../utils.ts";
import { IVerb, Lang, Mode } from "../types.ts";

const Verb: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const verbs = useSelector(getVerbs);
  const verb = useSelector(getVerb);
  const verbIdx = useSelector(getVerbIdx);
  const verbsOrder = useSelector(getVerbsOrder);
  const isLightMode = useSelector(getMode) === Mode.light;
  const tooltipOpen = useSelector(getShowTooltip);
  const fromLang = useSelector(getFromLang);

  const [lang, setLang] = useState<Lang>(fromLang);
  const [searchLang, setSearchLang] = useState<Lang>(fromLang);
  const [searchString, setSearchString] = useState<string>("");
  const [showSearchInput, setShowSearchInput] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [localNameRu, setLocalNameRu] = useState<string>("");
  const [localNameRo, setLocalNameRo] = useState<any>(null);
  const inputRef = useRef<HTMLInputElement>();

  const tooltipText = `Натисніть на дієслово щоб подивитись переклад.
     Натисніть ВІДМІНЮВАННЯ щоб подивитися відмінювання дієслова.
     Натисніть ДАЛІ щоб перейти до наступного дієслова.
     Наголос в дієслові позначається рисочкою над буквою`;

  useEffect(() => {
    if (verb) {
      setLang(fromLang);
      setTimeout(
        () => {
          setLocalNameRu(verb.nameRu);
          setLocalNameRo(getNameRo());
        },
        lang !== fromLang ? 100 : 0
      );
    }
  }, [verb, fromLang]);

  const translate = () => {
    dispatch(setShowTooltip(false));
    setShowSearchInput(false);
    lang === Lang.ro ? setLang(Lang.ru) : setLang(Lang.ro);
  };

  const getNameRo = () => {
    if (
      typeof verb.nameRo === "object" &&
      verb !== null &&
      verb?.nameRo[0] &&
      verb?.nameRo[1] &&
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
    const foundVerb = getVerbByIdx(verbs, verbsOrder[idx]);
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
    const foundVerb = getVerbByIdx(verbs, verbsOrder[idx]);
    if (foundVerb) {
      dispatch(setVerb(foundVerb));
    }
  };

  const onSearchClick = () => {
    hideTooltip();
    setShowSearchInput(true);
  };

  const onCancelSearchClick = () => {
    setSearchString("");
    setSearchResults([]);
    setShowSearchInput(false);
  };

  const onListItemClick = (item: IVerb) => {
    dispatch(setVerb(item));
    onCancelSearchClick();
  };

  const handleClearSearchString = () => {
    setSearchResults([]);
    setSearchString("");
    inputRef && inputRef.current && inputRef.current.focus();
  };

  const onSearchChange = (e: any) => {
    setSearchString(e.target.value);
    if (e.target.value.length > 1) {
      const searchResultsRo = verbs.filter((item: any) =>
        item.nameRo[0].includes(e.target.value.toLowerCase())
      );
      const searchResultsRu = verbs.filter((item: any) =>
        item.nameRu.includes(e.target.value.toLowerCase())
      );
      const searchResults = searchResultsRo.length
        ? searchResultsRo
        : searchResultsRu;
      const searchLang = searchResultsRo.length ? Lang.ro : Lang.ru;
      setSearchLang(searchLang);
      setSearchResults(searchResults);
    } else if (e.target.value.length === 1) {
      let searchResultsRo: any[] = [];
      let searchResultsRu: any[] = [];
      verbs.forEach((item: any) => {
        const regExp = new RegExp(`^${e.target.value.toLowerCase()}`);
        const matchesRo = item.nameRo[0].match(regExp);
        matchesRo && searchResultsRo.push(item);
        const matchesRu = item.nameRu.match(regExp);
        matchesRu && searchResultsRu.push(item);
      });
      const searchResults = searchResultsRo.length
        ? searchResultsRo.sort((a: any, b: any) => {
            return a.nameRo[0] > b.nameRo[0]
              ? 1
              : a.nameRo[0] < b.nameRo[0]
              ? -1
              : 0;
          })
        : searchResultsRu.sort((a: any, b: any) => {
            return a.nameRu > b.nameRu ? 1 : a.nameRu < b.nameRu ? -1 : 0;
          });
      const searchLang = searchResultsRo.length ? Lang.ro : Lang.ru;
      setSearchLang(searchLang);
      setSearchResults(searchResults);
    } else {
      setSearchResults([]);
    }
  };

  const getVerbDisplay = (side: string) => {
    return side === "front"
      ? fromLang === Lang.ru
        ? localNameRu
        : localNameRo
      : fromLang === Lang.ro
      ? localNameRu
      : localNameRo;
  };

  return verb ? (
    <div className="App-verb" onClick={hideTooltip}>
      {showSearchInput ? (
        <div className="App-verb-search-block">
          <TextField
            id="search-input"
            label="Пошук"
            size="medium"
            inputRef={inputRef}
            variant="outlined"
            autoFocus={true}
            value={searchString}
            onChange={onSearchChange}
            autoComplete="off"
            style={{ paddingRight: "0 !important" }}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{
                    position: "relative",
                    visibility: searchString.length ? "visible" : "hidden",
                  }}
                >
                  <IconButton onClick={handleClearSearchString} edge="end">
                    <BackspaceIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <IconButton
            onClick={onCancelSearchClick}
            className="App-verb-search-block_close-btn"
          >
            <Close />
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
                rotated: fromLang !== lang,
              })}
            >
              <LightTooltip
                title={tooltipText}
                open={tooltipOpen}
                className="App-verb-tooltip"
              >
                <VerbButton variant="contained" onClick={translate}>
                  {getVerbDisplay("front")}
                </VerbButton>
              </LightTooltip>
            </div>

            <div
              className={cx("App-verb-block1-button", "back", {
                rotated: fromLang !== lang,
              })}
            >
              <VerbButton
                variant="contained"
                onClick={translate}
                sx={{ pt: "7px" }}
              >
                {getVerbDisplay("back")}
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
