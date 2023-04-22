import { useState } from 'react'
import HoverContainer from '../Containers/HoverContainer'
import Flex from '../Containers/Flex'
import Grid from '../Containers/Grid'
import IndexDeleteTitle from '../Titles/IndexDeleteTitle'
import InputBlock from '../Inputs/InputBlock'
import InputAreaBlock from '../Inputs/InputAreaBlock'
import DynamicButton from '../Buttons/DynamicButton'
import PrimarySecondaryButtons from '../Buttons/PrimarySecondaryButtons'
import uniqid from 'uniqid'

function PersonalProjects({ onDelete }) {
  const defaultTitle = 'Personal Projects'
  const defaultPersonalProjects = [
    {
      name: 'Ninja CV App',
      showcasePlaceholder: 'Live',
      showcaseLink: 'https://lovrozagar.github.io/Ninja',
      docsPlaceholder: 'Code',
      docsLink: 'https://github.com/lovrozagar/Ninja-CV',
      id: uniqid(),
      points: [
        { text: 'Trained to become a ninja', id: uniqid() },
        { text: 'Successfully sliced thousands of resumes', id: uniqid() },
      ],
    },
  ]
  const newPersonalProject = {
    name: '',
    showcasePlaceholder: '',
    showcaseLink: '',
    docsPlaceholder: '',
    docsLink: '',
    id: uniqid(),
    points: [{ text: '', id: uniqid() }],
  }

  const [title, setTitle] = useState(defaultTitle)
  const [personalProjects, setPersonalProjects] = useState(
    defaultPersonalProjects
  )
  const [onEdit, setOnEdit] = useState(false)

  function handleTitleReset() {
    setTitle(defaultTitle)
  }

  function handleTitleChange(e) {
    setTitle(e.target.value)
  }

  function handleChange(e, id, property, pointsIndex = null) {
    setPersonalProjects((prev) =>
      prev.map((projects) => {
        if (projects.id !== id) return projects

        if (pointsIndex !== null) {
          const points = [...projects.points]
          const point = {
            ...points[pointsIndex],
            text: e.target.value,
          }
          points[pointsIndex] = point

          return { ...projects, points }
        }

        return { ...projects, [property]: e.target.value }
      })
    )
  }

  function handleProjectDelete(id) {
    setPersonalProjects((prev) => {
      if (prev.length === 1) {
        return [newPersonalProject]
      } else {
        return prev.filter((projects) => projects.id !== id)
      }
    })
  }

  function handlePointDelete(projectId, pointId) {
    setPersonalProjects((prev) =>
      prev.map((project) => {
        if (project.id !== projectId) return project

        const newPoints = project.points.filter((point) => point.id !== pointId)

        return { ...project, points: newPoints }
      })
    )
  }

  function handlePointAdd(id) {
    setPersonalProjects((prev) =>
      prev.map((experience) => {
        if (experience.id !== id) return experience

        return {
          ...experience,
          points: [...experience.points, { text: '', id: uniqid() }],
        }
      })
    )
  }

  function handleProjectAdd() {
    setPersonalProjects((prev) => [...prev, newPersonalProject])
  }

  function handleDone() {
    setOnEdit(false)
  }

  return (
    <HoverContainer onEdit={onEdit} fn={setOnEdit} onDelete={onDelete}>
      <Grid>
        {onEdit ? (
          <PersonalProjectsEdit
            title={title}
            onTitleReset={handleTitleReset}
            onTitleChange={handleTitleChange}
            personalProjects={personalProjects}
            onProjectAdd={handleProjectAdd}
            onProjectDelete={handleProjectDelete}
            onPointAdd={handlePointAdd}
            onPointDelete={handlePointDelete}
            onDone={handleDone}
            onChange={handleChange}
          />
        ) : (
          <div></div>
        )}
      </Grid>
    </HoverContainer>
  )
}

function PersonalProjectsEdit({
  title,
  onTitleReset,
  onTitleChange,
  personalProjects,
  onProjectAdd,
  onProjectDelete,
  onPointAdd,
  onPointDelete,
  onDone,
  onChange,
}) {
  return (
    <Grid gap={1.5}>
      <InputBlock
        button='restore'
        color='primary.text'
        bgcolor='black'
        name='Section Title'
        placeholder='e.g. Personal Projects'
        value={title}
        onClick={onTitleReset}
        onChange={onTitleChange}
      />
      {personalProjects.map((project, index) => {
        return (
          <Grid key={project.id}>
            <IndexDeleteTitle
              title={`${index + 1}. Project`}
              onDelete={() => onProjectDelete(project.id)}
            />
            <InputBlock
              color='primary.opposite'
              bgcolor='primary.violet'
              name='Name*'
              value={project.name}
            />
            <Grid type='1fr 1fr'>
              <InputBlock
                color='primary.opposite'
                bgcolor='primary.violet'
                name='Showcase Placeholder'
                value={project.showcasePlaceholder}
              />
              <InputBlock
                color='primary.opposite'
                bgcolor='primary.violet'
                name='Showcase Link'
                value={project.showcaseLink}
              />
              <InputBlock
                color='primary.opposite'
                bgcolor='primary.violet'
                name='Docs Placeholder'
                value={project.docsPlaceholder}
              />
              <InputBlock
                color='primary.opposite'
                bgcolor='primary.violet'
                name='Docs Link'
                value={project.docsLink}
              />
            </Grid>
            {project.points.map((point, index) => {
              return (
                <InputAreaBlock
                  key={point.id}
                  value={point.text}
                  color='primary.opposite'
                  bgcolor='primary.violet'
                  name={`${index + 1}. Point`}
                />
              )
            })}
            <Flex>
              <DynamicButton
                mainColor='black'
                type='button add'
                text='Add Point'
              />
            </Flex>
          </Grid>
        )
      })}
      
      <PrimarySecondaryButtons
        primaryText='Done'
        secondaryText='Add Project'
        onAdd={onProjectAdd}
        onDone={onDone}
      />
    </Grid>
  )
}

export default PersonalProjects
