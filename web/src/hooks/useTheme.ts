import type { GlobalThemeOverrides ***REMOVED*** from 'naive-ui'
import { darkTheme, lightTheme ***REMOVED*** from 'naive-ui'

const baseThemeOverrides: GlobalThemeOverrides = {
  common: {
    borderRadius: '6px',
    heightLarge: '40px',
    fontSizeLarge: '18px',
  ***REMOVED***,
***REMOVED***

const PrimaryColor = '#692ee6'

export function useTheme(***REMOVED*** {
  const defaultTheme = computed((***REMOVED*** => {
    return lightTheme
  ***REMOVED******REMOVED***
  const themeRevert = computed((***REMOVED*** => {
    return darkTheme
  ***REMOVED******REMOVED***

  const themeOverrides = computed<GlobalThemeOverrides>((***REMOVED*** => {
***REMOVED***
      common: {
        ...baseThemeOverrides.common,
        primaryColor: PrimaryColor,
        primaryColorHover: lightenDarkenColor(PrimaryColor, 30***REMOVED***,
        primaryColorPressed: lightenDarkenColor(PrimaryColor, -30***REMOVED***,
        primaryColorSuppl: getComplementaryColor(PrimaryColor***REMOVED***,
      ***REMOVED***,
      Input: {
        placeholderColor: '#a8aeb8',
      ***REMOVED***,
    ***REMOVED***
  ***REMOVED******REMOVED***


  return {
    defaultTheme,
    themeRevert,
    themeOverrides,
  ***REMOVED***
***REMOVED***


function lightenDarkenColor(col, amt***REMOVED*** {
  let usePound = false

  if (col[0] === '#'***REMOVED*** {
    col = col.slice(1***REMOVED***
    usePound = true
  ***REMOVED***

  const num = Number.parseInt(col, 16***REMOVED***

  let r = (num >> 16***REMOVED*** + amt

  if (r > 255***REMOVED*** {
    r = 255
  ***REMOVED*** else if (r < 0***REMOVED*** {
    r = 0
  ***REMOVED***

  let b = ((num >> 8***REMOVED*** & 0x00FF***REMOVED*** + amt

  if (b > 255***REMOVED*** {
    b = 255
  ***REMOVED*** else if (b < 0***REMOVED*** {
    b = 0
  ***REMOVED***

  let g = (num & 0x0000FF***REMOVED*** + amt

  if (g > 255***REMOVED*** {
    g = 255
  ***REMOVED*** else if (g < 0***REMOVED*** {
    g = 0
  ***REMOVED***

  return (usePound ? '#' : ''***REMOVED*** + (g | (b << 8***REMOVED*** | (r << 16***REMOVED******REMOVED***.toString(16***REMOVED***
***REMOVED***

function getComplementaryColor(hex***REMOVED*** {
  hex = hex.slice(1***REMOVED*** // remove #
  const r = Number.parseInt(hex.substring(0, 2***REMOVED***, 16***REMOVED***
  const g = Number.parseInt(hex.substring(2, 4***REMOVED***, 16***REMOVED***
  const b = Number.parseInt(hex.substring(4, 6***REMOVED***, 16***REMOVED***

  // get the complementary color
  const compR = (255 - r***REMOVED***.toString(16***REMOVED***.padStart(2, '0'***REMOVED***
  const compG = (255 - g***REMOVED***.toString(16***REMOVED***.padStart(2, '0'***REMOVED***
  const compB = (255 - b***REMOVED***.toString(16***REMOVED***.padStart(2, '0'***REMOVED***

  return `#${compR***REMOVED***${compG***REMOVED***${compB***REMOVED***`
***REMOVED***
