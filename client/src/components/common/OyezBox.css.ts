import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/themes.css";

export const oyezBox = style({
  display: "flex",
  flexDirection: "column",
  justifyItems: "center",
  alignItems: "center",
})

export const titleText = style({
  fontFamily: vars.fonts.body,
  fontSize: vars.fontSizes.title1,
  margin: "1rem 0",
})

export const bodyText = style({
  fontFamily: vars.fonts.body,
  fontWeight: vars.fontWeights.regular,
  fontSize: vars.fontSizes.bodyText,
  textAlign: "center",
  margin: "1rem 0",
})

export const buttonStyle = style({
  fontFamily: vars.fonts.body,
})
