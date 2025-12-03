import { style } from "@vanilla-extract/css"
import { vars } from "../../styles/themes.css"


export const titleBox = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 'auto',
  margin: vars.space["2x"],
  textAlign: "center",
})

export const titleText = style({
  fontFamily: vars.fonts.body,
  fontSize: vars.fontSizes.title1,
  marginBottom: "0.5rem",
})

export const bodyText = style({
  fontFamily: vars.fonts.body,
  fontWeight: vars.fontWeights.regular,
  fontSize: vars.fontSizes.title4,
  color: vars.colors.complementary,
  marginBottom: "2rem",
})
