import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const fontFamily = [
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
];

export const CapButton = styled(Button)({
  textTransform: "none",
  //backgroundColor: "#447744",
  //fontSize: 40,
  padding: "px 12px",
  fontWeight: "normal",
  //lineHeight: 2.0,
  fontFamily: fontFamily.join(","),
});

export const LowCaseButton = styled(Button)({
  textTransform: "lowercase",
  //color: "#444444",
  fontSize: 17,
  padding: "2px 12px",
  lineHeight: "1.5em",
  fontFamily: fontFamily.join(","),
});

export const ContainedButton = styled(Button)({
  textTransform: "lowercase",
  backgroundColor: "#118877",
  //color: "#444444",
  fontSize: 17,
  padding: "2px 12px",
  //lineHeight: 2.0,
  fontFamily: fontFamily.join(","),
});

export const OutlinedButton = styled(Button)({
  //variant: "text",
  textTransform: "uppercase",
  border: "1px solid #118877",
  //color: "#444444",
  fontSize: 17,
  padding: "2px 12px",
  //lineHeight: 2.0,
  fontFamily: fontFamily.join(","),
});

/*export const MyButtonGroup = styled(ButtonGroup)({
  //variant: "text",
  textTransform: "uppercase",
  border: "1px solid #118877",
  //color: "#444444",
  fontSize: 17,
  padding: "2px 12px",
  //lineHeight: 2.0,
  fontFamily: fontFamily.join(","),
});*/
