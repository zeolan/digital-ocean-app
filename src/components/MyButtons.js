import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CapButton = styled(Button)({
  textTransform: "none",
  //backgroundColor: "#447744",
  //fontSize: 40,
  padding: "px 12px",
  fontWeight: "normal",
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
  //color: "#444444",
  fontSize: 17,
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
