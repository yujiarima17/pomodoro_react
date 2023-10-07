import { defaultTheme } from './styles/themes/default'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './styles/global'
import { Router } from './Router'
import { BrowserRouter } from 'react-router-dom'
export function App() {
  return (
    // ThemeProvider is used to provide a default theme for the application, this is useful for black and white themes
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>

      <GlobalStyle />
    </ThemeProvider>
  )
}
