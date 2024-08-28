import React, { ReactElement } from "react";

import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} placement="top" />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    boxShadow: theme.shadows[1],
    fontSize: 17,
    lineHeight: "1.5em",
    maxWidth: "98%",
    marginRight: "1%",
    marginLeft: "1%",
  },
}));

// const tooltipText = `Натисніть на дієслово щоб подивитись переклад.
//    Натисніть ВІДМІНЮВАННЯ щоб подивитися відмінювання дієслова.
//    Натисніть ДАЛІ щоб перейти до наступного дієслова.
//    Наголос в дієслові позначається рисочкою над буквою`;

const tooltipText = `Нажмите на глагол чтобы посмотреть перевод.
  Нажмите СПРЯЖЕНИЕ чтобы посмотреть спряжение глагола.
  Нажмите ДАЛЬШЕ чтобы перейти к следующему глаголу.
  Ударение в словах обозначается верхним подчеркиванием`;

const HintTooltip: React.FC<{
  open: boolean;
  children: ReactElement;
}> = ({ open, children }) => {
  return (
    <LightTooltip
      title={tooltipText}
      open={open}
      className="App-verb-tooltip"
      data-testid="hint-tooltip"
    >
      {children}
    </LightTooltip>
  );
};

export default HintTooltip;
