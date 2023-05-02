// COMPONENTS
import { createTheme, ThemeProvider, Box } from '@mui/material'
import InfoBar from './Components/InfoBar'
import CV from './Components/CV'
import GithubButtonRow from './Components/GithubButtonRow'
import ClearResetButtons from './Components/Buttons/ClearResetButtons'
// FUNCTIONALITY
import { useRef, useState } from 'react'
import { getSectionExamples } from './Functions/examples'
import { getAppData } from './Functions/getSavedData'
import { saveAppData } from './Functions/sectionMethods'

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: ['Poppins', 'sans-serif'].join(','),
    },
  },
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
    violet: {
      main: '#121212',
      light: '#7d8af8',
      contrastText: '#ffffff',
    },
  },
})

function App() {
  const examples = getSectionExamples()
  const [sections, setSections] = useState(() => getAppData(examples))
  const [storageUpdate, setStorageUpdate] = useState(0)

  function handleClearPaper() {
    setSections(() => {
      const newData = []

      saveAppData(newData)
      return newData
    })
  }

  function handleResetExamples() {
    // reset and save only the sections that now exist on paper
    localStorage.removeItem('sections')
    setSections((prev) => {
      const newData = prev.map(({ title, content, ...rest }) => rest)

      saveAppData(newData)
      return newData
    })

    // re-render sections
    setStorageUpdate((prev) => prev + 1)

    // if no sections on paper, show default examples
    if (sections.length === 0) {
      setSections(examples)
      saveAppData(examples)
    }
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
            <ClearResetButtons
              onClear={handleClearPaper}
              onReset={handleResetExamples}
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
