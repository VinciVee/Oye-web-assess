import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/themes.css";

export const loadingBox = style({
  display: "flex",
  alignItems: "center",
  justifyItems: "center"
})

export const loadingSpinner = style({
  width: "3rem !important",
  height: "3rem !important",
  color: vars.colors.brandLight
})
