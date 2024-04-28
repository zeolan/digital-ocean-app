import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { IconButton, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Check from "@mui/icons-material/Check";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import ListItemIcon from "@mui/material/ListItemIcon";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";

import {
  getVerbs,
  setVerb,
  getSortVerbs,
  setSortVerbs,
  setVerbsOrder,
  setVerbIdx,
  setShowTooltip,
  getFromLang,
  setFromLang,
} from "../store/reducer.ts";
import { getRandomVerbsOrder, getSortedVerbsOrder } from "../utils.ts";
import { Lang } from "../types.ts";

function SettingsButton() {
  const dispatch = useDispatch();
  const verbs = useSelector(getVerbs);
  const sortVerbs = useSelector(getSortVerbs);
  const fromLang = useSelector(getFromLang);

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleClose = () => {
    dispatch(setShowTooltip(false));
    setOpen((prevOpen) => !prevOpen);
  };

  const handleFromLangClick = (event: Event | React.SyntheticEvent) => {
    const dataset = (event.target as HTMLDivElement).dataset;
    setOpen(false);
    if (dataset.active === "false") {
      dispatch(setFromLang(fromLang === Lang.ru ? Lang.ro : Lang.ru));
    } else {
      console.log("skip clicking on active item");
    }
  };

  const handleItemClick = (event: Event | React.SyntheticEvent) => {
    const dataset = (event.target as HTMLDivElement).dataset;
    setOpen(false);
    if (dataset.active === "false") {
      dispatch(setSortVerbs(!sortVerbs));
      if (!sortVerbs) {
        const verbsOrder = getSortedVerbsOrder(verbs);
        if (verbsOrder.length) {
          dispatch(setVerbsOrder(verbsOrder));
          const initialIndex = verbsOrder[0];
          dispatch(setVerbIdx(0));
          const initialVerb = verbs.find((verb) => verb.id === initialIndex);
          if (initialVerb) {
            dispatch(setVerb(initialVerb));
          }
        }
      } else {
        const numberOfVerbs = verbs.length;
        const verbsOrder = getRandomVerbsOrder(numberOfVerbs);
        if (verbsOrder.length) {
          dispatch(setVerbsOrder(verbsOrder));
          const initialIndex = verbsOrder[0];
          dispatch(setVerbIdx(0));
          const initialVerb = verbs.find((verb) => verb.id === initialIndex);
          if (initialVerb) {
            dispatch(setVerb(initialVerb));
          }
        }
      }
    } else {
      console.log("skip clicking on active item");
    }
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <div>
      <IconButton
        className="App-menu-button"
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClose}
      >
        <MenuIcon color="primary" />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        //disablePortal
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList
              autoFocusItem={open}
              id="composition-menu"
              aria-labelledby="composition-button"
              onKeyDown={handleListKeyDown}
            >
              <MenuItem
                onClick={handleItemClick}
                className={sortVerbs ? "active" : ""}
                data-active={sortVerbs}
              >
                <ListItemIcon
                  sx={{ visibility: sortVerbs ? "visible" : "hidden" }}
                >
                  <Check />
                </ListItemIcon>
                Сортування &nbsp;
                <ListItemIcon>
                  <SortByAlphaIcon />
                </ListItemIcon>
              </MenuItem>
              <MenuItem
                onClick={handleItemClick}
                className={!sortVerbs ? "active" : ""}
                data-active={!sortVerbs}
              >
                <ListItemIcon
                  sx={{ visibility: !sortVerbs ? "visible" : "hidden" }}
                >
                  <Check />
                </ListItemIcon>
                В випадковому порядку
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={handleFromLangClick}
                className={fromLang === Lang.ro ? "active" : ""}
                data-active={fromLang === Lang.ro}
              >
                <ListItemIcon
                  sx={{
                    visibility: fromLang === Lang.ro ? "visible" : "hidden",
                  }}
                >
                  <Check />
                </ListItemIcon>
                {"Ro -> Ru"}
              </MenuItem>
              <MenuItem
                onClick={handleFromLangClick}
                className={fromLang === Lang.ru ? "active" : ""}
                data-active={fromLang === Lang.ru}
              >
                <ListItemIcon
                  sx={{
                    visibility: fromLang === Lang.ru ? "visible" : "hidden",
                  }}
                >
                  <Check />
                </ListItemIcon>
                {"Ru -> Ro"}
              </MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </div>
  );
}

export default SettingsButton;
