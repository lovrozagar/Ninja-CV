// COMPONENTS
import { Box, Paper } from '@mui/material'
import AddSection from './Dropdowns/AddSection'
import Name from './Sections/Name'
import Position from './Sections/Position'
import Links from './Sections/Links'
import Skills from './Sections/Skills'
import WorkExperience from './Sections/WorkExperience'
import PersonalProjects from './Sections/PersonalProjects'
import Education from './Sections/Education'
import AboutMe from './Sections/AboutMe'
// FUNCTIONALITY
import { useState } from 'react'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import uniqid from 'uniqid'

function CV() {
  // HOOKS
  const [sections, setSections] = useState([
    { name: 'Name', id: uniqid() },
    { name: 'Position', id: uniqid() },
    { name: 'Links', id: uniqid() },
    { name: 'Skills', id: uniqid() },
    { name: 'Work Experience', id: uniqid() },
    { name: 'Personal Projects', id: uniqid() },
    { name: 'Education', id: uniqid() },
    { name: 'About Me', id: uniqid() },
  ])

  function handleAdd(e) {
    setSections((prev) => [...prev, { name: e.target.value, id: uniqid() }])
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
      <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
        <Droppable droppableId='droppable-1'>
          {(provider) => {
            return (
              <Box
                ref={provider.innerRef}
                {...provider.droppableProps}
                style={{ display: 'grid' }}
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
}

export default CV
