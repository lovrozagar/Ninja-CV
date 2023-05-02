// COMPONENTS
import { Box, Paper } from '@mui/material'
import Name from './Sections/Name'
import Position from './Sections/Position'
import Links from './Sections/Links'
import Skills from './Sections/Skills'
import WorkExperience from './Sections/WorkExperience'
import PersonalProjects from './Sections/PersonalProjects'
import Education from './Sections/Education'
import AboutMe from './Sections/AboutMe'
import AddSection from './Dropdowns/AddSection'
// FUNCTIONALITY
import { forwardRef } from 'react'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { saveAppData } from '../Functions/sectionMethods'

const CV = forwardRef(({ sections, setSections }, ref) => {
  function handleAdd(e) {
    setSections((prev) => {
      const newData = [
        ...prev,
        { name: e.target.value, id: `section-${prev.length + 1}` },
      ]

      saveAppData(newData)
      return newData
    })
  }

  function handleDelete(id) {
    setSections((prev) => {
      const newData = prev.filter((section) => section.id !== id)

      saveAppData(newData)
      return newData
    })
  }

  function handleDragEnd(result) {
    const { destination, source } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return

    setSections((prev) => {
      const newData = [...prev]
      const [removed] = newData.splice(source.index, 1)
      newData.splice(destination.index, 0, removed)

      saveAppData(newData)
      return newData
    })
  }

  function getSectionType(section, index) {
    const sectionProps = {
      key: section.id,
      id: section.id,
      index,
      sections,
      setSections,
      onDelete: () => handleDelete(section.id),
    }
    let component = null

    switch (section.name) {
      case 'Name':
        component = <Name {...sectionProps} />
        break
      case 'Position':
        component = <Position {...sectionProps} />
        break
      case 'Links':
        component = <Links {...sectionProps} />
        break
      case 'Skills':
        component = <Skills {...sectionProps} />
        break
      case 'Work Experience':
        component = <WorkExperience {...sectionProps} />
        break
      case 'Education':
        component = <Education {...sectionProps} />
        break
      case 'Personal Projects':
        component = <PersonalProjects {...sectionProps} />
        break
      case 'About Me':
        component = <AboutMe {...sectionProps} />
        break
      default:
        component = null
        break
    }

    return component
  }

  const paperStyling = {
    maxWidth: '210mm',
    minHeight: '295mm',
    m: '0 auto',
    p: '1rem 0.5rem 1rem 0.05rem',
    textAlign: 'center',
    boxShadow: '0px 0px 30px 0px rgba(125, 137, 248, 0.5)',
    '@media print': {
      minHeight: 'unset',
      m: '0',
      p: '0',
      border: 'none',
      outline: 'none',
      boxShadow: 'none',
    },
  }
  const containerStyling = {
    display: 'grid',
    gap: '0.5rem',
    '@media print': {
      gap: '0',
    },
  }

  return (
    <Paper ref={ref} sx={paperStyling}>
      <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
        <Droppable droppableId='droppable-1'>
          {(provider) => {
            return (
              <Box
                ref={provider.innerRef}
                {...provider.droppableProps}
                sx={containerStyling}
              >
                {sections.map((section, index) =>
                  getSectionType(section, index)
                )}
                {provider.placeholder}
              </Box>
            )
          }}
        </Droppable>
      </DragDropContext>
      <AddSection length={sections.length} onAdd={handleAdd} />
    </Paper>
  )
})

export default CV
