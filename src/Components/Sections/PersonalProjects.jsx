import { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import HoverContainer from '../Containers/HoverContainer'
import Flex from '../Containers/Flex'
import Grid from '../Containers/Grid'
import SectionTitleView from '../Titles/SectionTitleView'
import EntryLinks from '../Text/EntryLinks'
import Points from '../Text/Points'
import IndexDeleteTitle from '../Titles/IndexDeleteTitle'
import InputBlock from '../Inputs/InputBlock'
import InputAreaBlock from '../Inputs/InputAreaBlock'
import DynamicButton from '../Buttons/DynamicButton'
import PrimarySecondaryButtons from '../Buttons/PrimarySecondaryButtons'
import Placeholders from '../../Functions/placeholders'
import uniqid from 'uniqid'

function PersonalProjects({ onDelete }) {
  const [onEdit, setOnEdit] = useState(false)
  const defaultTitle = 'Personal Projects'
  const defaultPersonalProjects = [
    {
      name: 'Ninja CV App',
      showcasePlaceholder: 'Live',
      showcaseLink: 'https://lovrozagar.github.io/Ninja-CV',
      docsPlaceholder: 'Code',
      docsLink: 'https://github.com/lovrozagar/Ninja-CV',
      id: uniqid(),
      points: [
        { text: 'Trained to become a ninja', id: uniqid() },
        { text: 'Successfully sliced thousands of resumes', id: uniqid() },
      ],
    },
  ]
  const [title, setTitle] = useState(defaultTitle)
  const [personalProjects, setPersonalProjects] = useState(
    defaultPersonalProjects
  )
  const newProject = {
    name: '',
    showcasePlaceholder: '',
    showcaseLink: '',
    docsPlaceholder: '',
    docsLink: '',
    id: uniqid(),
    points: [{ text: '', id: uniqid() }],
  }
  const newPoint = { text: '', id: uniqid() }

  function handleTitleChange(e) {
    setTitle(e.target.value)
  }

  function handleTitleReset() {
    setTitle(defaultTitle)
  }

  function handleProjectAdd() {
    setPersonalProjects((prev) => [...prev, newProject])
  }

  function handleProjectChange(e, id, property) {
    setPersonalProjects((prev) =>
      prev.map((project) => {
        if (project.id !== id) return project
        return { ...project, [property]: e.target.value }
      })
    )
  }

  function handleProjectDelete(id) {
    setPersonalProjects((prev) => {
      if (prev.length === 1) {
        return [newProject]
      } else {
        return prev.filter((project) => project.id !== id)
      }
    })
  }

  function handlePointAdd(id) {
    setPersonalProjects((prev) =>
      prev.map((project) => {
        if (project.id !== id) return project

        return {
          ...project,
          points: [...project.points, newPoint],
        }
      })
    )
  }

  function handlePointChange(e, projectId, pointId) {
    setPersonalProjects((prev) =>
      prev.map((project) => {
        if (project.id !== projectId) return project
        const newPoints = project.points.map((point) => {
          if (point.id !== pointId) return point
          return { ...point, text: e.target.value }
        })
        return { ...project, points: newPoints }
      })
    )
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

  function handleDone() {
    setOnEdit(false)
  }

  useEffect(() => {
    if (!onEdit) {
      setPersonalProjects((prev) =>
        prev
          // Remove unnecessary spaces
          .map((project) => {
            const usedPoints = project.points
              .map((point) => ({ ...point, text: point.text.trim() }))
              // Delete Empty Points
              .filter((point) => point.text !== '')
            return {
              ...project,
              name: project.name.trim(),
              showcasePlaceholder: project.showcasePlaceholder.trim(),
              showcaseLink: project.showcaseLink.trim(),
              docsPlaceholder: project.docsPlaceholder.trim(),
              docsLink: project.docsLink.trim(),
              points: usedPoints,
            }
          })
          // Delete Empty Personal Projects
          .filter((project) => {
            if (
              project.name === '' &&
              project.showcasePlaceholder === '' &&
              project.showcaseLink === '' &&
              project.docsPlaceholder === '' &&
              project.docsLink === ''
            )
              return false
            return true
          })
      )
    }
  }, [onEdit])

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
            onProjectChange={handleProjectChange}
            onProjectDelete={handleProjectDelete}
            onPointAdd={handlePointAdd}
            onPointChange={handlePointChange}
            onPointDelete={handlePointDelete}
            onDone={handleDone}
          />
        ) : (
          <PersonalProjectsView
            title={title}
            personalProjects={personalProjects}
          />
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
  onProjectChange,
  onProjectDelete,
  onPointAdd,
  onPointChange,
  onPointDelete,
  onDone,
}) {
  return (
    <Grid gap={1.5}>
      <InputBlock
        button='restore'
        color='primary.text'
        bgcolor='black'
        name='Section Title'
        placeholder='e.g. Personal Projects'
        s
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
              placeholder={Placeholders.getProject(index)}
              value={project.name}
              onChange={(e) => onProjectChange(e, project.id, 'name')}
            />
            <Grid type='1fr 1fr'>
              <InputBlock
                color='primary.opposite'
                bgcolor='primary.violet'
                name='Showcase Placeholder'
                placeholder={Placeholders.getShowcase(index)}
                value={project.showcasePlaceholder}
                onChange={(e) =>
                  onProjectChange(e, project.id, 'showcasePlaceholder')
                }
              />
              <InputBlock
                color='primary.opposite'
                bgcolor='primary.violet'
                name='Showcase Link'
                placeholder={'e.g. https://some-link.com'}
                value={project.showcaseLink}
                onChange={(e) => onProjectChange(e, project.id, 'showcaseLink')}
              />
              <InputBlock
                color='primary.opposite'
                bgcolor='primary.violet'
                name='Docs Placeholder'
                placeholder={Placeholders.getDocs(index)}
                value={project.docsPlaceholder}
                onChange={(e) =>
                  onProjectChange(e, project.id, 'docsPlaceholder')
                }
              />
              <InputBlock
                color='primary.opposite'
                bgcolor='primary.violet'
                name='Docs Link'
                placeholder={'e.g. https://some-other-link.com'}
                value={project.docsLink}
                onChange={(e) => onProjectChange(e, project.id, 'docsLink')}
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
                  placeholder={Placeholders.getProjectPoint(index)}
                  onChange={(e) => onPointChange(e, project.id, point.id)}
                  onDelete={() => onPointDelete(project.id, point.id)}
                />
              )
            })}
            <Flex>
              <DynamicButton
                mainColor='black'
                type='button add'
                text='Add Point'
                onClick={() => onPointAdd(project.id)}
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

function PersonalProjectsView({ title, personalProjects }) {
  return (
    <Box>
      <SectionTitleView title={title} />
      <Grid>
        {personalProjects.map((project) => {
          return (
            <Box key={project.id}>
              {project.name !== '' && (
                <Box key={project.id}>
                  <Flex type='between'>
                    <Typography fontSize={16} fontWeight='600'>
                      {project.name}
                    </Typography>
                    <EntryLinks
                      showcaseLink={project.showcaseLink}
                      showcasePlaceholder={project.showcasePlaceholder}
                      docsLink={project.docsLink}
                      docsPlaceholder={project.docsPlaceholder}
                    />
                  </Flex>
                  <Points array={project.points} />
                </Box>
              )}
            </Box>
          )
        })}
      </Grid>
    </Box>
  )
}

export default PersonalProjects
