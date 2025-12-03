import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/themes.css";

export const gridContainer = style({
  width: "100%",
  margin: `${vars.space['5x']} 0`,
})

export const productList = style({
  display: "flex",
  flexFlow: "row wrap",
  gap: vars.space["3x"],
  width: "100%",
  margin: "2rem auto"
})
