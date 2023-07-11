import { BrowserRouter } from 'react-router-dom'
import { Router } from './components/Router'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/defaultTheme.ts'
import { CycleContextProvider } from './contexts/cycleContext.tsx'

function App() {
  return (
    <CycleContextProvider>
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
        <GlobalStyle />
      </ThemeProvider>
    </CycleContextProvider>
  )
}

export default App
