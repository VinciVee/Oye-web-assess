import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/themes.css";

export const app = style({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundColor: vars.colors.primary,
  fontFamily: vars.fonts.body,
})

export const appContent = style({
  margin: `${vars.space["3x"]} 0`,
  flex: 1, //numbers don't need quotes - javascript rule
});
