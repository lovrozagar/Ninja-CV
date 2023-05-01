// COMPONENTS
import { createTheme, ThemeProvider, Box } from '@mui/material'
import InfoBar from './Components/InfoBar'
import CV from './Components/CV'
import GithubButtonRow from './Components/GithubButtonRow'
import ClearShowButtons from './Components/Buttons/ClearShowButtons'
// FUNCTIONALITY
import { useRef, useState } from 'react'
import { getSectionExamples } from './Functions/examples'
import { getAppData } from './Functions/getSavedData'

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
    info: {
      main: '#7d8af8',
      contrastText: '#ffffff',
    },
    violet: {
      main: '#121212',
      secondary: '#7d8af8',
      light: '#7d8af8',
      dark: '#7d8af8',
      color: '#7d8af8',
      text: '#7d8af8',
      contrastText: '#ffffff', // add this property
    },
    text: {
      violet: '#7d8af8',
    },
  },
})

function App() {
  const examples = getSectionExamples()
  const [sections, setSections] = useState(() => getAppData(examples))
  const [storageUpdate, setStorageUpdate] = useState(0)

  function handleClearPaper() {
    setSections([])
  }

  function handleSetExamples() {
    localStorage.removeItem('sections')
    setStorageUpdate((prev) => prev + 1)
    if (sections.length === 0) setSections(examples)
  }

  function useComponentRef() {
    const componentRef = useRef()

    return componentRef
  }
  const componentRef = useComponentRef()

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <InfoBar ref={componentRef} />
        <Box margin='3.25rem 1rem 1rem 1rem'>
          <Box sx={{ maxWidth: '210mm', m: '0 auto' }}>
            <ClearShowButtons
              onClear={handleClearPaper}
              onShow={handleSetExamples}
            />
          </Box>
          <CV
            sections={sections}
            setSections={setSections}
            ref={componentRef}
            key={storageUpdate}
          />
        </Box>
        <GithubButtonRow />
      </Box>
    </ThemeProvider>
  )
}

export default App
