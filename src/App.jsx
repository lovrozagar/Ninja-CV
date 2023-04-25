import { createTheme, ThemeProvider, Box } from '@mui/material'
import InfoBar from './Components/InfoBar'
import CV from './Components/CV'

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
      backgroundMain: '#1b1b1b',
      barMain: '#121212',
      transparentMain: '#0000003f',
      opposite: '#ffffff',
      lightGrey: '#ededed',
      mediumGrey: '#bbbbbb',
      darkGrey: '#333333',
      transparentGrey: '#ffffff3f',
      violet: '#7d8af8',
      transparentViolet: '#7d89f84c',
      red: '#d32f2f',
      holdRed: '#b91c1c',
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <InfoBar />
        <Box marginX={1.5} marginY={6}>
          <CV />
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
