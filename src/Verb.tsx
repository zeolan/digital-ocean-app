import React, { useState, useEffect } from "react";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Search } from "@mui/icons-material";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import cx from "classnames";

import data from "./data.json";
import { CapButton } from "./MyButtons";
import "./App.css";

export interface Verb {
  id: number;
  nameRo: string;
  nameRu: string;
  conjugation: {
    eu: string;
    tu: string;
    el: string;
    noi: string;
    voi: string;
    ei: string;
    eu1: string;
    tu1: string;
    el1: string;
    noi1: string;
    voi1: string;
    ei1: string;
  };
  participle: string;
  impS: string;
  impP: string;
}

enum Lang {
  ro = "Ro",
  ru = "Ru",
}

interface VerbProps {
  verb: Verb;
  onNextClick: () => void;
  onConjClick: () => void;
}

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    //backgroundColor: theme.palette.common.white,
    //color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 20,
  },
}));

const Verb: React.FC<VerbProps> = ({ verb, onNextClick, onConjClick }) => {
  const [verbs, setVerbs] = useState<any[]>(data);
  const [lang, setLang] = useState<Lang>(Lang.ro);
  const [showSearchInput, setShowSearchInput] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
  const [localNameRu, setLocalNameRu] = useState<string>("");
  const { id, nameRo, nameRu } = verb;
  const tooltipText =
    "Нажмите на ГЛАГОЛ чтобы посмотреть перевод. Посмотреть спряжение глагола - нажмите СПРЯЖЕНИЕ. Перейти к след. глаголу - нажмите ДАЛЬШЕ";
  const hideTooltip = sessionStorage.getItem("tooltip");

  useEffect(() => {
    setTimeout(() => {
      if (hideTooltip !== "true") {
        setTooltipOpen(true);
      }
    }, 500);
    setTimeout(() => {
      sessionStorage.setItem("tooltip", "true");
    }, 2000);
  }, []);

  useEffect(() => {
    setLang(Lang.ro);
    setTimeout(() => {
      setLocalNameRu(nameRu);
    }, 1000);
  }, [id]);

  const translate = () => {
    setTooltipOpen(false);
    setShowSearchInput(false);
    lang === Lang.ro ? setLang(Lang.ru) : setLang(Lang.ro);
  };

  const getNameRo = () => {
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
      return <>{result}</>;
    } else {
      return nameRo;
    }
  };

  const onSearchClick = () => {
    setShowSearchInput(true);
  };

  const onSearchChange = (e: any) => {
    console.log(e);
    const searchResults = verbs.filter((item: any) =>
      item.nameRo.includes(e.target.value)
    );
    setSearchResults(searchResults);
    console.log(searchResults);
  };

  return (
    <div className={cx("App-verb")}>
      <div className={cx("App-verb1")}>
        {false && (
          <div className={cx("App-verb-block1")}>
            {!showSearchInput ? (
              <IconButton onClick={onSearchClick}>
                <Search />
              </IconButton>
            ) : (
              <>
                <TextField
                  id="standard-basic"
                  label=""
                  variant="standard"
                  autoFocus={true}
                  onChange={onSearchChange}
                />
                {searchResults.length > 0
                  ? searchResults.map((option) => (
                      <List>
                        <ListItem
                          key={option.id}
                          value={option.nameRo}
                          disablePadding
                        >
                          <ListItemText primary={option.nameRo} />
                        </ListItem>
                      </List>
                    ))
                  : null}
              </>
            )}
          </div>
        )}
        <div
          className={cx("button", "App-animate1", {
            rotated: lang === Lang.ru,
          })}
        >
          <LightTooltip
            title={tooltipText}
            placement="top"
            open={tooltipOpen}
            arrow
          >
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
      <div className={cx("App-verb2")}>
        <div>
          <Button
            variant="text"
            onClick={() => {
              setTooltipOpen(false);
              setShowSearchInput(false);
              onConjClick();
            }}
          >
            Спряжение
          </Button>
        </div>
        <div>
          <Button
            variant={"text"}
            onClick={() => {
              setTooltipOpen(false);
              setShowSearchInput(false);
              onNextClick();
            }}
          >
            Дальше
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Verb;
