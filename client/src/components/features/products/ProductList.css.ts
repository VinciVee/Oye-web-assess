import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/themes.css";

export const productList = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(10rem, 1fr))",
  gap: vars.space["3x"],
  width: "100%",
  margin: "2rem auto"
})
