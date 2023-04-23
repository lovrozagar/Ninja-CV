import { useEffect, useMemo, useState } from 'react'
import { Box } from '@mui/material'
import uniqid from 'uniqid'
import Flex from '../Containers/Flex'
import Grid from '../Containers/Grid'
import HoverContainer from '../Containers/HoverContainer'
import SectionTitleView from '../Titles/SectionTitleView'
import PrimaryDescription from '../Text/PrimaryDescription'
import SecondaryDescription from '../Text/SecondaryDescription'
import InputBlock from '../Inputs/InputBlock'
import InputAreaBlock from '../Inputs/InputAreaBlock'
import Points from '../Text/Points'
import PrimarySecondaryButtons from '../Buttons/PrimarySecondaryButtons'
import DynamicButton from '../Buttons/DynamicButton'
import IndexDeleteTitle from '../Titles/IndexDeleteTitle'
import Placeholders from '../../Functions/placeholders'

function WorkExperience({ onDelete }) {
  const [onEdit, setOnEdit] = useState(false)
  const defaultTitle = 'Work Experience'
  const defaultWorkExperience = useMemo(
    () => [
      {
        company: 'Ninja Dojo d.o.o.',
        location: 'Ancient Japan, JP',
        position: 'Professional Ninja',
        time: 'Sep 2021 - Present',
        id: uniqid(),
        points: [
          { text: 'Trained to become a ninja', id: uniqid() },
          { text: 'Successfully sliced thousands of resumes', id: uniqid() },
        ],
      },
    ],
    []
  )
  const [title, setTitle] = useState(defaultTitle)
  const [workExperience, setWorkExperience] = useState(defaultWorkExperience)
  const newExperience = {
    company: '',
    location: '',
    position: '',
    time: '',
    points: [{ text: '', id: uniqid() }],
    id: uniqid(),
  }
  const newPoint = { text: '', id: uniqid() }

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

  function handleDone() {
    setOnEdit(false)
  }

  useEffect(() => {
    if (!onEdit) {
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
    <HoverContainer fn={setOnEdit} onEdit={onEdit} onDelete={onDelete}>
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
            onDone={handleDone}
          />
        ) : (
          <WorkExperienceView title={title} workExperience={workExperience} />
        )}
      </Grid>
    </HoverContainer>
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
  onDone,
}) {
  return (
    <Grid>
      <InputBlock
        button='restore'
        color='primary.text'
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
            <Grid type='1fr 1fr'>
              <Box gridColumn='1/3'>
                <IndexDeleteTitle
                  title={`${index + 1}. Experience`}
                  onDelete={() => onExperienceDelete(work.id)}
                />
              </Box>
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
            </Grid>
            <Grid type='1fr 1fr'>
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
            </Grid>
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
        onDone={onDone}
      />
    </Grid>
  )
}

function WorkExperienceView({ title, workExperience }) {
  return (
    <Box>
      <SectionTitleView title={title} />
      <Grid>
        {workExperience.map((work) => {
          return (
            <Box key={work.id}>
              {work.company !== '' &&
                work.position !== '' &&
                work.time !== '' && (
                  <Box>
                    <PrimaryDescription
                      left={work.company}
                      right={work.location}
                    />
                    <SecondaryDescription
                      left={work.position}
                      right={work.time}
                    />
                    <Points array={work.points} />
                  </Box>
                )}
            </Box>
          )
        })}
      </Grid>
    </Box>
  )
}

export default WorkExperience
