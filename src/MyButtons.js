import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CapButton = styled(Button)({
  textTransform: "capitalize",
  //fontSize: 40,
  padding: "px 12px",
  //fontWeight: "bolder",
  //lineHeight: 2.0,
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
});

export const LowCaseButton = styled(Button)({
  textTransform: "lowercase",
  fontSize: 18,
  padding: "2px 12px",
  //lineHeight: 2.0,
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
});
