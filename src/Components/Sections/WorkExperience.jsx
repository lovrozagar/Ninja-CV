// COMPONENTS
import { Box } from '@mui/material'
import HoverContainer from '../Containers/HoverContainer'
import Flex from '../Containers/Flex'
import Grid from '../Containers/Grid'
import BreakpointGrid from '../Containers/BreakpointGrid'
import Drag from '../Containers/Drag'
import DragButton from '../Buttons/DragButton'
import SectionTitleView from '../Titles/SectionTitleView'
import PrimaryDescription from '../Text/PrimaryDescription'
import SecondaryDescription from '../Text/SecondaryDescription'
import InputBlock from '../Inputs/InputBlock'
import InputAreaBlock from '../Inputs/InputAreaBlock'
import Points from '../Text/Points'
import PrimarySecondaryButtons from '../Buttons/PrimarySecondaryButtons'
import DynamicButton from '../Buttons/DynamicButton'
import IndexDeleteTitle from '../Titles/IndexDeleteTitle'
// FUNCTIONALITY
import { useState, useEffect } from 'react'
import { Draggable } from '@hello-pangea/dnd'
import { getTitleData, getSectionData } from '../../Functions/getSavedData'
import { getWorkExperienceExample } from '../../Functions/examples'
import { saveDataComplex } from '../../Functions/sectionMethods'
import Placeholders from '../../Functions/placeholders'
import deepCompareValue from '../../Functions/deepCompareValue'
import uniqid from 'uniqid'

function WorkExperience({ onDelete, id, index, setSections }) {
  const [onEdit, setOnEdit] = useState(false)
  const [open, setOpen] = useState(false)

  const defaultTitle = 'Work Experience'
  const [title, setTitle] = useState(() => getTitleData(defaultTitle, id))
  const [titleOld, setTitleOld] = useState(null)

  const example = getWorkExperienceExample()
  const [workExperience, setWorkExperience] = useState(() =>
    getSectionData(example, id)
  )
  const [workExperienceOld, setWorkExperienceOld] = useState(null)
  const newExperience = {
    company: '',
    location: '',
    position: '',
    time: '',
    points: [{ text: '', id: uniqid() }],
    id: uniqid(),
  }
  const newPoint = { text: '', id: uniqid() }

  function handleEditStart() {
    setTitleOld(title)
    setWorkExperienceOld(structuredClone(workExperience))
    setOnEdit(true)
  }

  function handleEditEnd() {
    setOnEdit(false)
    setTitleOld(null)
    setWorkExperienceOld(null)
    saveDataComplex({ setter: setSections, id, title, content: workExperience })
  }

  function handleDonePress() {
    handleEditEnd()
    handleSnackbarChange()
    // disable hanging ripple
    document.activeElement.blur()
  }

  function handleSnackbarChange() {
    if (
      (!deepCompareValue(workExperience, workExperienceOld) ||
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

  function handleExperienceAdd() {
    setWorkExperience((prev) => [...prev, newExperience])
  }

  function handleExperienceChange(e, id, property) {
    setWorkExperience((prev) =>
      prev.map((experience) => {
        if (experience.id !== id) return experience
        return { ...experience, [property]: e.target.value }
      })
    )
  }

  function handleExperienceDelete(id) {
    setWorkExperience((prev) => {
      if (prev.length === 1) {
        return [newExperience]
      } else {
        return prev.filter((experience) => experience.id !== id)
      }
    })
  }

  function handlePointAdd(id) {
    setWorkExperience((prev) =>
      prev.map((experience) => {
        if (experience.id !== id) return experience

        return {
          ...experience,
          points: [...experience.points, newPoint],
        }
      })
    )
  }

  function handlePointChange(e, educationId, pointId) {
    setWorkExperience((prev) =>
      prev.map((experience) => {
        if (experience.id !== educationId) return experience
        const newPoints = experience.points.map((point) => {
          if (point.id !== pointId) return point
          return { ...point, text: e.target.value }
        })
        return { ...experience, points: newPoints }
      })
    )
  }

  function handlePointDelete(experienceId, pointId) {
    setWorkExperience((prev) =>
      prev.map((experience) => {
        if (experience.id !== experienceId) return experience

        const newPoints = experience.points.filter(
          (point) => point.id !== pointId
        )

        return { ...experience, points: newPoints }
      })
    )
  }

  useEffect(() => {
    if (!onEdit) {
      // Remove unnecessary spaces
      setTitle((prev) => prev.trim())
      setWorkExperience((prev) =>
        prev
          // Remove unnecessary spaces
          .map((work) => {
            const usedPoints = work.points
              .map((point) => ({ ...point, text: point.text.trim() }))
              // Delete Empty Points
              .filter((point) => point.text !== '')
            return {
              ...work,
              company: work.company.trim(),
              location: work.location.trim(),
              position: work.position.trim(),
              time: work.time.trim(),
              points: usedPoints,
            }
          })
          // Delete Empty Work Experiences
          .filter((work) => {
            if (
              work.company === '' &&
              work.location === '' &&
              work.position === '' &&
              work.time === ''
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
                  <WorkExperienceEdit
                    title={title}
                    onTitleReset={handleTitleReset}
                    onTitleChange={handleTitleChange}
                    workExperience={workExperience}
                    onExperienceAdd={handleExperienceAdd}
                    onExperienceChange={handleExperienceChange}
                    onExperienceDelete={handleExperienceDelete}
                    onPointAdd={handlePointAdd}
                    onPointChange={handlePointChange}
                    onPointDelete={handlePointDelete}
                    onDonePress={handleDonePress}
                  />
                ) : (
                  <WorkExperienceView
                    title={title}
                    workExperience={workExperience}
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

function WorkExperienceEdit({
  title,
  onTitleReset,
  onTitleChange,
  workExperience,
  onExperienceAdd,
  onExperienceChange,
  onExperienceDelete,
  onPointAdd,
  onPointChange,
  onPointDelete,
  onDonePress,
}) {
  return (
    <Grid>
      <InputBlock
        button='restore'
        color='primary.opposite'
        bgcolor='black'
        name='Section Title'
        placeholder='e.g. Work Experience'
        value={title}
        onClick={onTitleReset}
        onChange={onTitleChange}
      />
      {workExperience.map((work, index) => {
        return (
          <Grid key={work.id}>
            <IndexDeleteTitle
              title={`${index + 1}. Experience`}
              onDelete={() => onExperienceDelete(work.id)}
            />
            <BreakpointGrid>
              <InputBlock
                color='primary.opposite'
                bgcolor='primary.violet'
                name='Company*'
                placeholder={Placeholders.getCompany(index)}
                value={work.company}
                onChange={(e) => onExperienceChange(e, work.id, 'company')}
              />
              <InputBlock
                color='primary.opposite'
                bgcolor='primary.violet'
                name='Location'
                placeholder={Placeholders.getLocation(index)}
                value={work.location}
                onChange={(e) => onExperienceChange(e, work.id, 'location')}
              />
              <InputBlock
                color='primary.opposite'
                bgcolor='primary.violet'
                name='Position*'
                placeholder={Placeholders.getPosition(index)}
                value={work.position}
                onChange={(e) => onExperienceChange(e, work.id, 'position')}
              />
              <InputBlock
                color='primary.opposite'
                bgcolor='primary.violet'
                name='Time*'
                placeholder={Placeholders.getTime(index)}
                value={work.time}
                onChange={(e) => onExperienceChange(e, work.id, 'time')}
              />
            </BreakpointGrid>
            {work.points.map((point, index) => {
              return (
                <InputAreaBlock
                  key={point.id}
                  value={point.text}
                  color='primary.opposite'
                  bgcolor='primary.violet'
                  name={`${index + 1}. Point`}
                  placeholder={Placeholders.getPoint(index)}
                  onChange={(e) => onPointChange(e, work.id, point.id)}
                  onDelete={() => onPointDelete(work.id, point.id)}
                />
              )
            })}
            <Flex>
              <DynamicButton
                mainColor='black'
                type='button add'
                text='Add Point'
                onClick={() => onPointAdd(work.id)}
              />
            </Flex>
          </Grid>
        )
      })}
      <PrimarySecondaryButtons
        primaryText='Done'
        secondaryText='Add Experience'
        onAdd={onExperienceAdd}
        onDone={onDonePress}
      />
    </Grid>
  )
}

function WorkExperienceView({ title, workExperience }) {
  return (
    <Box>
      <SectionTitleView title={title || 'Work Experience'} />
      <Grid gap={0} marginTop={0.5}>
        {workExperience.map((work) => {
          return (
            <Box key={work.id} marginTop={0.5}>
              {work.company !== '' &&
                work.position !== '' &&
                work.time !== '' && (
                  <Grid gap={0.15}>
                    <PrimaryDescription
                      left={work.company}
                      right={work.location}
                    />
                    <SecondaryDescription
                      left={work.position}
                      right={work.time}
                    />
                    <Points array={work.points} />
                  </Grid>
                )}
            </Box>
          )
        })}
      </Grid>
    </Box>
  )
}

export default WorkExperience
