import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/themes.css";

export const productItem = style({
  margin: "1rem 0",
})

export const imageCard = style({
  width: "auto",
  height: "200px",
  objectFit: "contain",
  marginBottom: vars.space["1x"]
})

export const productName = style({
  fontSize: vars.fontSizes.bodyText,
  textTransform: "capitalize"
})
