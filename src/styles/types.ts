export interface ThemeProps {
  // color
  background1: string
  background2: string
  background3: string
  background4: string
  background5: string

  // text color
  text1: string
  text2: string
  text3: string
  text4: string
  text5: string
  text6: string
  text7: string
  text8: string

  //button color
  button1: string
  buttonHover1: string
  button2: string
  buttonHover2: string
  button3: string
  buttonHover3: string
  button4: string
  buttonHover4: string
  button5: string
  buttonHover5: string
  button6: string
  buttonHover6: string

  buttonDisabled: string
  // border
  border1: string
  border2: string
  border3: string
  border4: string
  border5: string
  divider: string
  // box shadow
  boxShadow1: string
}

export type GlobalThemeProps = {
  theme: ThemeProps
}

//Flex Layout
export type TFlexDirections = 'row' | 'row-reverse' | 'column' | 'column-reverse'
export type TFlexJustifyContents = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
export type TFlexAlignItems =
  | 'stretch'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  | 'first baseline'
  | 'last baseline'
  | 'start'
  | 'end'
  | 'self-start'
  | 'self-end'
