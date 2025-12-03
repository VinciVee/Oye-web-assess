import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/themes.css";


export const navContainer = style({
  width: 'clamp(20.5rem, 96vw, 75rem)',
  padding: 0,
  gap: vars.space['2x'],
  zIndex: 1,
})

export const navbarBrand = style({
  height: "2.8rem",
  width: "50%",
  // paddingRight: vars.space["4x"],

  display: 'flex',
  gap: vars.space['2x'],
  alignItems: "center",

  backgroundColor: vars.colors.grey300,
  border: `3px ${vars.colors.primary} solid`,
  borderStyle: "outset",
})

export const logo = style({
  height: "2.4rem",
  padding: "1 0 0 2.5",
})

export const brandTitle = style({
  fontFamily: vars.fonts.body,
  fontSize: vars.fontSizes.bodyBig,
  textTransform: "capitalize",
  color: vars.colors.brandDark,
})

export const navMenu = style({
  justifyContent: "flex-end",
})

export const toggleButton = style({
  height: "2.8rem",
  backgroundColor: vars.colors.grey300,
  border: `3px ${vars.colors.primary} solid`,
  borderStyle: "outset",

  ":hover": {
    color: vars.colors.complementary,
    backgroundColor: vars.colors.primary,
    border: `3px ${vars.colors.complementary} solid`,
  }
})

export const heroDiv = style({
  height: "40vh",
  width: "100vw",
  objectFit: "cover",
  objectPosition: "center center",
  position: "relative",
  top: "-3rem",
})
