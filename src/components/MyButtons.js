import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const fontFamily = [
  // Add font family
];

export const CapButton = styled(Button)({
  textTransform: "none",
  padding: "3px 10px",
  fontWeight: "normal",
  fontFamily: fontFamily.join(","),
});

export const VerbButton = styled(Button)({
  textTransform: "none",
  padding: "15px 5px 10px 5px",
  fontWeight: "normal",
  fontFamily: fontFamily.join(","),
});

export const LowCaseButton = styled(Button)({
  textTransform: "lowercase",
  fontSize: 17,
  padding: "2px 12px",
  lineHeight: "1.5em",
  fontFamily: fontFamily.join(","),
  width: "max-content",
});

export const OutlinedButton = styled(Button)({
  textTransform: "uppercase",
  border: "1px solid #118877",
  fontSize: 17,
  padding: "2px 12px",
  fontFamily: fontFamily.join(","),
});
