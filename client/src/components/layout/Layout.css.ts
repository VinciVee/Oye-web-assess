import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../../styles/themes.css";

export const app = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  minHeight: "100vh",
  backgroundColor: vars.colors.primary,
  fontFamily: vars.fonts.body,
})

globalStyle('main', {
  width: 'clamp(20.5rem, 96vw, 75rem)',
  minHeight: "30rem",
  backgroundColor: vars.colors.primary,
  paddingBlock: vars.space["3x"],
  position: "relative",
  zIndex: "2",
  top: "calc(-3rem - 2rem)",
})
