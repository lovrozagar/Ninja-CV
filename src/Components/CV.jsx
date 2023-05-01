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

const CV = forwardRef(({ sections, setSections }, ref) => {
  function handleAdd(e) {
    setSections((prev) => [
      ...prev,
      { name: e.target.value, id: `section-${prev.length + 1}` },
    ])
  }

  function handleDelete(id) {
    setSections((prev) => prev.filter((section) => section.id !== id))
  }

  function handleDragEnd(result) {
    const { destination, source } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return

    const updatedList = [...sections]
    const [removed] = updatedList.splice(source.index, 1)
    updatedList.splice(destination.index, 0, removed)

    setSections(updatedList)
  }

  function getSectionType(section, index) {
    let component = null

    switch (section.name) {
      case 'Name':
        component = (
          <Name
            key={section.id}
            id={section.id}
            index={index}
            sections={sections}
            setSections={setSections}
            onDelete={() => handleDelete(section.id)}
          />
        )
        break
      case 'Position':
        component = (
          <Position
            key={section.id}
            id={section.id}
            index={index}
            onDelete={() => handleDelete(section.id)}
          />
        )
        break
      case 'Links':
        component = (
          <Links
            key={section.id}
            id={section.id}
            index={index}
            onDelete={() => handleDelete(section.id)}
          />
        )
        break
      case 'Skills':
        component = (
          <Skills
            key={section.id}
            id={section.id}
            index={index}
            onDelete={() => handleDelete(section.id)}
          />
        )
        break
      case 'Work Experience':
        component = (
          <WorkExperience
            key={section.id}
            id={section.id}
            index={index}
            onDelete={() => handleDelete(section.id)}
          />
        )
        break
      case 'Education':
        component = (
          <Education
            key={section.id}
            id={section.id}
            index={index}
            onDelete={() => handleDelete(section.id)}
          />
        )
        break
      case 'Personal Projects':
        component = (
          <PersonalProjects
            key={section.id}
            id={section.id}
            index={index}
            onDelete={() => handleDelete(section.id)}
          />
        )
        break
      case 'About Me':
        component = (
          <AboutMe
            key={section.id}
            id={section.id}
            index={index}
            onDelete={() => handleDelete(section.id)}
          />
        )
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
    p: '1rem 0.5rem 1rem 0.25rem',
    textAlign: 'center',
    boxShadow: '0px 0px 30px 0px rgba(125, 137, 248, 0.5)',
    '@media (max-width: 330px)': {
      '&': {
        marginTop: '7.25rem',
      },
    },
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
      <AddSection onAdd={handleAdd} />
    </Paper>
  )
})

export default CV
