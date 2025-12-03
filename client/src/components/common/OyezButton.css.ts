import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/themes.css';

export const button = style({
  padding: `${vars.space['1x']} ${vars.space['4x']}` ,
  color: vars.colors.primary,
  backgroundColor: vars.colors.complementary,
  borderRadius: 0,
  border: `3px ${vars.colors.primary} solid`,
  borderStyle: "outset",
  textTransform: "uppercase",
  fontFamily: vars.fonts.body,
  fontWeight: vars.fontWeights.semiBold,
  textAlign: "center",

  ":hover": {
    color: vars.colors.grey600,
    backgroundColor: vars.colors.primary,
    border: `3px ${vars.colors.grey600} solid`,
    borderStyle: "outset",
  }
})
