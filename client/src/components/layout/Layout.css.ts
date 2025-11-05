import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/themes.css";

// writing css in JS
// version before using themes.css.ts
// export const app = style({
//   display: "flex",
//   flexDirection: "column",
//   minHeight: "100vh", //letters are strings and need quotes - javascript rule
//   backgroundColor: "#FFFFFF",
//   fontFamily: "Monserrat, apple-system, sans-serif"
// })

export const app = style({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundColor: vars.colors.primary,
  fontFamily: vars.fonts.brand,
})

export const appContent = style({
  margin: `${vars.space["6x"]} 0`,
  flex: 1, //numbers don't need quotes - javascript rule
});
