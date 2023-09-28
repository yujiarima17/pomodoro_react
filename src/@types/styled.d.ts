import "styled-components";
import { defaultTheme } from "../styles/themes/default";

// styled-components theme typed
type ThemeType = typeof defaultTheme;

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}
