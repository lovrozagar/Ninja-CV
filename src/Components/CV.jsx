import { Paper } from '@mui/material'
import Name from './Sections/Name'
import Position from './Sections/Position'
import Links from './Sections/Links'
import AddSection from './Dropdowns/AddSection'
import Skills from './Sections/Skills'
import WorkExperience from './Sections/WorkExperience'
import uniqid from 'uniqid'
import { useState } from 'react'

function CV() {
  // HOOKS
  const [sections, setSections] = useState([])

  // HANDLERS
  function handleAdd(e) {
    setSections((prev) => [...prev, { name: e.target.value, id: uniqid() }])
  }

  //HELPERS
  function getSectionType(section) {
    let component = null

    switch (section) {
      case 'Skills':
        component = <Skills key={section.id} />
        break
      case 'Work Experience':
        component = <WorkExperience key={section.id} />
        break
      default:
        break
    }

    return component
  }

  return (
    <Paper
      sx={{
        maxWidth: '210mm',
        minHeight: '295mm',
        m: '0 auto',
        p: '0 0.5rem 0.5rem 0.5rem',
        textAlign: 'center',
      }}
    >
      <Name />
      <Position />
      <Links />
      {sections.map((section) => getSectionType(section.name))}
      <AddSection onAdd={handleAdd} />
    </Paper>
  )
}

export default CV
