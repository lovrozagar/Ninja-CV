import { Box, createTheme, ThemeProvider } from '@mui/material'
import CV from './Components/CV'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000',
      mainHover: '#222222',
      text: '#ffffff',
    },
    secondary: {
      main: '#999999',
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: '1rem' }}>
        <CV />
      </Box>
    </ThemeProvider>
  )
}

export default App
