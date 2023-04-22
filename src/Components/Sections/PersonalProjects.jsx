import { useState, useEffect } from 'react'
import { Typography, Link } from '@mui/material'
import HoverContainer from '../Containers/HoverContainer'
import Flex from '../Containers/Flex'
import Grid from '../Containers/Grid'
import SectionTitleView from '../Titles/SectionTitleView'
import EntryLinks from '../Text/EntryLinks'
import PrimaryDescription from '../Text/PrimaryDescription'
import SecondaryDescription from '../Text/SecondaryDescription'
import Points from '../Text/Points'
import IndexDeleteTitle from '../Titles/IndexDeleteTitle'
import InputBlock from '../Inputs/InputBlock'
import InputAreaBlock from '../Inputs/InputAreaBlock'
import DynamicButton from '../Buttons/DynamicButton'
import PrimarySecondaryButtons from '../Buttons/PrimarySecondaryButtons'
import uniqid from 'uniqid'
import { Box } from '@mui/material'

function PersonalProjects({ onDelete }) {
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

  // Delete Empty Work Experiences or Points
  useEffect(() => {
    if (!onEdit) {
      setPersonalProjects((prev) =>
        prev
          .map((project) => {
            const usedPoints = project.points.filter(
              (point) => point.text.trim() !== ''
            )
            return { ...project, points: usedPoints }
          })
          .filter((work) => {
            if (work.name.trim() === '') return false
            return true
          })
      )
    }
  }, [onEdit])

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
  onProjectDelete,
  onPointAdd,
  onPointDelete,
  onDone,
  onChange,
}) {
  const projects = [
    'Pet Care App',
    'Garden Tracker',
    'Fitness Tracker',
    'Online Recipe Box',
    'Meal Planning App',
    'DIY Home Automation',
    'Language Learning Game',
    'Online Learning Platform',
    'Virtual Closet Organizer',
    'Social Network for Book Lovers',
  ]
  const points = [
    'Designed the user interface and developed the front-end for the website',
    'Created a marathon training plan to track progress',
    'Used a language learning app and practice french daily',
    'Chose a game engine and developed the game mechanics',
    'Develop a podcast content strategy and record episodes',
    'Planed out the garden and researched plant care',
    'Chose a color scheme and created a budget for room renovation',
    'Created a project plan with specific milestones',
    'Documented project progress and earnings',
    'Wrote a script for a film',
  ]

  const showcases = ['Website', 'Live', 'Showcase', 'Solution', 'Result']
  const docs = ['Documentation', 'Code', 'Steps', 'Plan', 'scheme']

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
              placeholder={`e.g. ${
                index < projects.length ? projects[index] : projects[index - 10]
              }`}
              value={project.name}
              onChange={(e) => onChange(e, project.id, 'name')}
            />
            <Grid type='1fr 1fr'>
              <InputBlock
                color='primary.opposite'
                bgcolor='primary.violet'
                name='Showcase Placeholder'
                placeholder={`e.g. ${
                  index < showcases.length
                    ? showcases[index]
                    : showcases[index - 5]
                }`}
                value={project.showcasePlaceholder}
                onChange={(e) => onChange(e, project.id, 'showcasePlaceholder')}
              />
              <InputBlock
                color='primary.opposite'
                bgcolor='primary.violet'
                name='Showcase Link'
                placeholder={'e.g. https://some-link.com'}
                value={project.showcaseLink}
                onChange={(e) => onChange(e, project.id, 'showcaseLink')}
              />
              <InputBlock
                color='primary.opposite'
                bgcolor='primary.violet'
                name='Docs Placeholder'
                placeholder={`e.g. ${
                  index < docs.length ? docs[index] : docs[index - 5]
                }`}
                value={project.docsPlaceholder}
                onChange={(e) => onChange(e, project.id, 'docsPlaceholder')}
              />
              <InputBlock
                color='primary.opposite'
                bgcolor='primary.violet'
                name='Docs Link'
                placeholder={'e.g. https://some-other-link.com'}
                value={project.docsLink}
                onChange={(e) => onChange(e, project.id, 'docsLink')}
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
                  placeholder={`e.g. ${
                    index < points.length ? points[index] : points[index - 10]
                  }`}
                  onChange={(e) => onChange(e, project.id, 'points', index)}
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
              {project.name.trim() !== '' && (
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
