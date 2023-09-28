import { Button } from "./components/Button";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
export function App() {
  return (
    // ThemeProvider is used to provide a default theme for the application, this is useful for black and white themes
    <ThemeProvider theme={defaultTheme}>
      <Button></Button>
      <Button></Button>
      <GlobalStyle />
    </ThemeProvider>
  );
}
