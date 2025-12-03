import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/themes.css';

export const generalForm = style({
  width: "max(60vw, 1120px)",
  margin: vars.space['3x'],
})

export const authForm = style({
  width: "min(40vw, 800px)",
  margin: vars.space['3x'],
})

export const container = style({
  marginTop: "0.1rem",
  minHeight: "70vh",
  display: "flex",
  flexDirection: "column",
  placeItems: "start center",
})

export const leadCard = style({
  background: vars.colors.primary,
  color: vars.colors.complementary,
  margin: "auto",
  padding: "2rem",
  borderRadius: 3,
  boxShadow: "rgba(0, 0, 0, 0.2) 0px 18px 50px -10px",
  textAlign: "center",
})

export const cardTitle = style({
  color: vars.colors.brand,
  paddingBottom: "1rem",
  fontSize: "2em",
  fontWeight: vars.fontWeights.semiBold
})
