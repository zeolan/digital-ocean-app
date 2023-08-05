import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Check from "@mui/icons-material/Check";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import ListItemIcon from "@mui/material/ListItemIcon";

//import MenuItem from "@mui/material/MenuItem";
//import MenuList from "@mui/material/MenuList";

import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";

import {
  setVerb,
  getSortVerbs,
  setSortVerbs,
  setVerbsOrder,
  setVerbIdx,
  setShowTooltip,
} from "../store/appSlice.ts";
import { getRandomVerbsOrder, getSortedVerbsOrder } from "../utils.ts";
import data from "../data.json";

function SettingsButton() {
  const dispatch = useDispatch();
  const sortVerbs = useSelector(getSortVerbs);

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleClose = () => {
    dispatch(setShowTooltip(false));
    setOpen((prevOpen) => !prevOpen);
  };

  const handleItemClick = (event: Event | React.SyntheticEvent) => {
    const dataset = (event.target as HTMLDivElement).dataset;
    setOpen(false);
    if (dataset.active === "false") {
      dispatch(setSortVerbs(!sortVerbs));
      if (!sortVerbs) {
        const verbsOrder = getSortedVerbsOrder(data);
        if (verbsOrder.length) {
          dispatch(setVerbsOrder(verbsOrder));
          const initialIndex = verbsOrder[0];
          dispatch(setVerbIdx(0));
          const initialVerb = data.find((verb) => verb.id === initialIndex);
          if (initialVerb) {
            dispatch(setVerb(initialVerb));
          }
        }
      } else {
        const numberOfVerbs = data.length;
        const verbsOrder = getRandomVerbsOrder(numberOfVerbs);
        if (verbsOrder.length) {
          dispatch(setVerbsOrder(verbsOrder));
          const initialIndex = verbsOrder[0];
          dispatch(setVerbIdx(0));
          const initialVerb = data.find((verb) => verb.id === initialIndex);
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
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </div>
  );
}

export default SettingsButton;