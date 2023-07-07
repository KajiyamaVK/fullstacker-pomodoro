import 'styled-components'
import { defaultTheme } from '../styles/themes/defaultTheme'

type defaultThemeType = typeof defaultTheme

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends defaultThemeType {}
}
