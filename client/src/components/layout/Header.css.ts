import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/themes.css";

export const navbar = style({
  fontFamily: vars.fonts.brand,
  backgroundColor: vars.colors.primary,
  transition: "background 0.2s ease-in, color 0.2s ease-in",
  boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px"
})

export const brandLink = style({
  display: 'flex',
  flexDirection: "row",
  gap: vars.space['2x'],
  alignItems: "center",
  color: vars.colors.complementary,
  textTransform: "uppercase",
})

export const logo = style({
  height: 60,
})

export const logoTextBox = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  color: vars.colors.brandDark,
  gap: 0,
})

export const brand = style({
  fontFamily: vars.fonts.body,
  fontSize: vars.fontSizes.bodyBig,
  lineHeight: "20px"
})

export const brandSub = style({
  fontSize: vars.fontSizes.bodyText,
  fontWeight: vars.fontWeights.regular,
})

export const navLink = style({
  fontFamily: vars.fonts.body,
  color: vars.colors.complementary,
  fontSize: vars.fontSizes.bodyText,
  fontWeight: vars.fontWeights.medium,
  textTransform: "uppercase",
  transition: "0.2s ease-in",

  ":hover": {
    color: vars.colors.brand
  },
})

export const navMenu = style({
  display: "flex",
  placeItems: "start start",
  columnGap: vars.space["2x"],
  rowGap: vars.space.none,
})
