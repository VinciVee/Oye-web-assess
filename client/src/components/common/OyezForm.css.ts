import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/themes.css';

export const generalForm = style({
  width: "max(60vw, 1120px)",
  margin: vars.space['3x'],
})

export const authForm = style({
  width: "min(85vw, 500px)",
  margin: vars.space['3x'],
})

export const container = style({
  marginTop: "0.1rem",
  minHeight: "70vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
})

export const leadCard = style({
  background: vars.colors.primary,
  color: vars.colors.complementary,
  margin: 0,
  padding: "2rem",
  borderRadius: 3,
  boxShadow: "rgba(0, 0, 0, 0.2) 0px 18px 50px -10px",
  textAlign: "center",
})

export const cardTitle = style({
  fontFamily: vars.fonts.brand,
  fontWeight: vars.fontWeights.semiBold,
  fontFeatureSettings: vars.fontFeatures.styleSet3,
  color: vars.colors.brandDark,
  paddingBottom: "1rem",
  fontSize: vars.fontSizes.title2,
})

export const cardBody = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
})
