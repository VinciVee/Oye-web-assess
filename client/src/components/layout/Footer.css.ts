import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/themes.css";

export const footer = style({
  width: "100vw",
  fontFamily: vars.fonts.body,
  padding: "1rem",
  textAlign: "center",
  color: "#FFFFFF",
  backgroundColor: "#212529",
})
