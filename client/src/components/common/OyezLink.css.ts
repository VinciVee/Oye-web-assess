import { style } from '@vanilla-extract/css'
import { vars } from '../../styles/themes.css'

export const oyezLink = style({
  fontFamily: vars.fonts.body,
  fontWeight: vars.fontWeights.medium,
  fontSize: vars.fontSizes.bodyText,
  textAlign: "center",
  color: vars.colors.grey900,
  backgroundColor: vars.colors.grey300,
  height: "2.8rem",
  padding: `${vars.space['1x']} ${vars.space['3x']}` ,
  border: `3px ${vars.colors.primary} solid`,
  borderStyle: "outset",

  ":hover": {
    color: vars.colors.brand,
    backgroundColor: vars.colors.primary,
    border: `3px ${vars.colors.primary} solid`,
    borderStyle: "outset",
  }
})
