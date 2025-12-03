import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/themes.css";

export const productCard = style({
  width: "max(250px, min-content)",
  background: "none",
  border: "none",
  borderRadius: 0,
})

export const imageBox = style({
  height: "200px",
  objectFit: "contain",
  display: "inline-block",
  // marginBottom: vars.space["1x"]
})

export const detailsBox = style({
  fontSize: vars.fontSizes.bodyText,
  textTransform: "capitalize",
  padding: vars.space["2x"],
  textWrap: "wrap",
  maxWidth: "280px",
  boxSizing: "border-box",
})
