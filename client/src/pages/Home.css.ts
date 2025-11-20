import { style, globalStyle } from "@vanilla-extract/css" // globalStyle used to target a specific node element, e.g: h1
import { vars } from "../styles/themes.css"

export const bootRow = style({
  marginInline: "1rem",
})

export const imageBox = style({
  width: "100%",
  height: "300px",
  objectFit: "cover",
  objectPosition: "top center",
})
