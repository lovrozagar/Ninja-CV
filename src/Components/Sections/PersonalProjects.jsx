// COMPONENTS
import { Box, Typography } from '@mui/material'
import HoverContainer from '../Containers/HoverContainer'
import Flex from '../Containers/Flex'
import Grid from '../Containers/Grid'
import Drag from '../Containers/Drag'
import DragButton from '../Buttons/DragButton'
import SectionTitleView from '../Titles/SectionTitleView'
import EntryLinks from '../Text/EntryLinks'
import Points from '../Text/Points'
import IndexDeleteTitle from '../Titles/IndexDeleteTitle'
import InputBlock from '../Inputs/InputBlock'
import InputAreaBlock from '../Inputs/InputAreaBlock'
import DynamicButton from '../Buttons/DynamicButton'
import PrimarySecondaryButtons from '../Buttons/PrimarySecondaryButtons'
// FUNCTIONALITY
import { useState, useEffect } from 'react'
import { Draggable } from '@hello-pangea/dnd'
import Placeholders from '../../Functions/placeholders'
import deepCompareValue from '../../Functions/deepCompareValue'
import uniqid from 'uniqid'

function PersonalProjects({ onDelete, id, index }) {
  const [onEdit, setOnEdit] = useState(false)
  const [open, setOpen] = useState(false)
  const [linkDialog, setLinkDialog] = useState(false)
  const defaultTitle = 'Personal Projects'
  const defaultProjects = [
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
  const [titleOld, setTitleOld] = useState(null)
  const [personalProjects, setPersonalProjects] = useState(defaultProjects)
  const [personalProjectsOld, setPersonalProjectsOld] = useState(null)
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

  function handleEditStart() {
    setTitleOld(title)
    setPersonalProjectsOld(structuredClone(personalProjects))
    setOnEdit(true)
  }

  function handleEditEnd() {
    setOnEdit(false)
    setTitleOld(null)
    setPersonalProjectsOld(null)
  }

  function handleDonePress() {
    handleEditEnd()
    handleSnackbarChange()
    // disable hanging ripple
    document.activeElement.blur()
  }

  function handleSnackbarChange() {
    if (
      (!deepCompareValue(personalProjects, personalProjectsOld) ||
        title !== titleOld) &&
      !open
    )
      setOpen(true)
  }

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

  useEffect(() => {
    if (!onEdit) {
      // Remove unnecessary spaces
      setTitle((prev) => prev.trim())
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
    <Draggable draggableId={id} index={index} direction='vertical'>
      {(provided, snapshot) => {
        return (
          <Drag onEdit={onEdit} provided={provided}>
            <DragButton
              onEdit={onEdit}
              isDragging={snapshot.isDragging}
              {...provided.dragHandleProps}
            />
            <HoverContainer
              title={title}
              onEdit={onEdit}
              onEditStart={handleEditStart}
              onEditEnd={handleEditEnd}
              onDelete={onDelete}
              onSnackbarChange={handleSnackbarChange}
              isDragging={snapshot.isDragging}
              open={open}
              close={() => setOpen(false)}
            >
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
                    onDonePress={handleDonePress}
                  />
                ) : (
                  <PersonalProjectsView
                    title={title}
                    personalProjects={personalProjects}
                    open={linkDialog}
                    setOpen={setLinkDialog}
                    onEditStart={handleEditStart}
                  />
                )}
              </Grid>
            </HoverContainer>
          </Drag>
        )
      }}
    </Draggable>
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
  onDonePress,
}) {
  return (
    <Grid gap={1.5}>
      <InputBlock
        button='restore'
        color='primary.opposite'
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
        onDone={onDonePress}
      />
    </Grid>
  )
}

function PersonalProjectsView({
  title,
  personalProjects,
  open,
  setOpen,
  onEditStart,
}) {
  const [hyperlink, setHyperlink] = useState(null)

  function handleOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  function handleEdit() {
    onEditStart()
    setOpen(false)
  }

  function handleLinkClick(e, hyperlink) {
    e.stopPropagation()
    setHyperlink(hyperlink)
    handleOpen()
  }

  return (
    <Box>
      <SectionTitleView title={title || 'Personal Projects'} />
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
                      open={open}
                      onOpen={handleOpen}
                      onClose={handleClose}
                      onEdit={handleEdit}
                      hyperlink={hyperlink}
                      handleLinkClick={handleLinkClick}
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
