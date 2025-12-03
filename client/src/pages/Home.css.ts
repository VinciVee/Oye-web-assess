import { style } from "@vanilla-extract/css"
import { vars } from "../styles/themes.css"

export const imageBox = style({
  width: "100%",
  height: "300px",
  objectFit: "cover",
  objectPosition: "top center",
})

export const pageContainer = style({
  display: "flex",
  flexDirection: "column",
  justifyItems: "start",
  alignItems: "center",
})
