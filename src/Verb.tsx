import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

import cx from "classnames";

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
  const [lang, setLang] = useState<Lang>(Lang.ro);
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
    lang === Lang.ro ? setLang(Lang.ru) : setLang(Lang.ro);
  };

  return (
    <div className={cx("App-verb")}>
      <div className={cx("App-verb1")}>
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
              {nameRo}
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
