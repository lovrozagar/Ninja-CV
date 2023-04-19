import { useEffect, useMemo, useState } from 'react'
import { Box, Typography } from '@mui/material'
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

function WorkExperience({ onDelete }) {
  // INIT VALUES
  const defaultTitle = 'Work Experience'
  const newExperience = {
    title: defaultTitle,
    company: '',
    location: '',
    position: '',
    time: '',
    points: [{ text: '', id: uniqid() }],
    id: uniqid(),
  }

  // HOOKS
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
  const [workExperience, setWorkExperience] = useState(defaultWorkExperience)
  const [title, setTitle] = useState(defaultTitle)
  const [onEdit, setOnEdit] = useState(false)

  // Delete Empty Work Experiences or Points
  useEffect(() => {
    if (!onEdit) {
      setWorkExperience((prev) =>
        prev
          .map((work) => {
            const usedPoints = work.points.filter(
              (point) => point.text.trim() !== ''
            )
            return { ...work, points: usedPoints }
          })
          .filter((work) => {
            if (
              work.company.trim() === '' &&
              work.location.trim() === '' &&
              work.position.trim() === '' &&
              work.time.trim() === ''
            )
              return false
            return true
          })
      )
    }
  }, [onEdit])

  // HANDLERS
  function handleTitleReset() {
    setTitle(defaultTitle)
  }

  function handleTitleChange(e) {
    setTitle(e.target.value)
  }

  function handleChange(e, id, property, pointsIndex = null) {
    setWorkExperience((prev) =>
      prev.map((experience) => {
        if (experience.id !== id) return experience

        if (pointsIndex !== null) {
          const points = [...experience.points]
          const point = {
            ...points[pointsIndex],
            text: e.target.value,
          }
          points[pointsIndex] = point

          return { ...experience, points }
        }

        return { ...experience, [property]: e.target.value }
      })
    )
  }

  function handleExperienceDelete(id) {
    setWorkExperience((prev) =>
      prev
        .map((experience) => {
          if (prev.index === 0) return newExperience
          return experience
        })
        .filter((experience) => experience.id !== id)
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

  function handlePointAdd(id) {
    setWorkExperience((prev) =>
      prev.map((experience) => {
        if (experience.id !== id) return experience

        return {
          ...experience,
          points: [...experience.points, { text: '', id: uniqid() }],
        }
      })
    )
  }

  function handleAdd() {
    setWorkExperience((prev) => [...prev, newExperience])
  }

  function handleDone() {
    setOnEdit(false)
  }

  return (
    <HoverContainer
      margin='wide'
      fn={setOnEdit}
      onEdit={onEdit}
      onDelete={onDelete}
    >
      <Grid>
        {onEdit ? (
          <WorkExperienceEdit
            title={title}
            onTitleReset={handleTitleReset}
            onTitleChange={handleTitleChange}
            workExperience={workExperience}
            onExperienceDelete={handleExperienceDelete}
            onPointAdd={handlePointAdd}
            onPointDelete={handlePointDelete}
            onAdd={handleAdd}
            onDone={handleDone}
            onChange={handleChange}
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
  onExperienceDelete,
  onChange,
  onPointDelete,
  onPointAdd,
  onAdd,
  onDone,
}) {
  const companies = [
    'Apple Inc.',
    'Google LLC',
    'Amazon.com',
    'Facebook Inc.',
    'Microsoft',
    'Twitter Inc.',
    'Pinterest',
    'Snapchat Inc.',
    'LinkedIn Corp.',
    'Dropbox Inc.',
  ]

  const locations = [
    'Zagreb, HR',
    'Tokyo, JP',
    'Remote',
    'Berlin, DE',
    'San Francisco, CA',
  ]

  const positions = [
    'App Developer',
    'UX Designer',
    'QA Tester',
    'Tech Writer',
    'Data Analyst',
    'Project Manager',
    'Marketing Specialist',
    'Content Creator',
    'Business Analyst',
    'Support Specialist',
  ]

  const time = [
    'Jan 2020 - Present',
    'Feb 2020 - Present',
    'Apr 2021 - Jun 2021',
    'Jul 2021 - Sep 2021',
    'Oct 2021 - Dec 2021',
    'Jan 2022 - Mar 2022',
    'Apr 2022 - Jun 2022',
    'Jul 2022 - Sep 2022',
    'Oct 2022 - Dec 2022',
  ]

  const bullets = [
    'Managed social media campaigns',
    'Analyzed campaign performance data',
    'Created visual content for social',
    'Interacted with customers online',
    'Developed social media strategies',
    'Designed mobile app UI',
    'Developed user-friendly interfaces',
    'Collaborated with development team',
    'Conducted user research studies',
    'Created wireframes and prototypes',
  ]

  return (
    <Grid>
      <InputBlock
        type='between restore'
        color='primary.text'
        bgcolor='black'
        name='Section Title'
        placeholder='e.g Work Experience'
        value={title}
        onClick={onTitleReset}
        onChange={onTitleChange}
      />
      {workExperience.map((work, index) => {
        return (
          <Grid key={work.id}>
            <Grid type='1fr 1fr'>
              <Box gridColumn='1/3'>
                <Flex type='between'>
                  <Typography sx={{ ml: 1 }}>{`${
                    index + 1
                  }. Experience`}</Typography>
                  <DynamicButton
                    type='button delete'
                    text='Remove'
                    color='primary.main'
                    onClick={() => onExperienceDelete(work.id)}
                  />
                </Flex>
              </Box>
              <InputBlock
                type='between'
                color='primary.opposite'
                bgcolor='primary.color'
                name='Company*'
                placeholder={
                  index < companies.length
                    ? `e.g. ${companies[index]}`
                    : `e.g. ${companies[index - 10]}`
                }
                value={work.company}
                onChange={(e) => onChange(e, work.id, 'company')}
              />
              <InputBlock
                type='between'
                color='primary.opposite'
                bgcolor='primary.color'
                name='Location'
                placeholder={
                  index < locations.length
                    ? `e.g. ${locations[index]}`
                    : `e.g. ${locations[index - 5]}`
                }
                value={work.location}
                onChange={(e) => onChange(e, work.id, 'location')}
              />
            </Grid>
            <Grid type='1fr 1fr'>
              <InputBlock
                type='start'
                color='primary.opposite'
                bgcolor='primary.color'
                name='Position*'
                placeholder={
                  index < positions.length
                    ? `e.g. ${positions[index]}`
                    : `e.g. ${positions[index - 10]}`
                }
                value={work.position}
                onChange={(e) => onChange(e, work.id, 'position')}
              />
              <InputBlock
                type='between no-button'
                color='primary.opposite'
                bgcolor='primary.color'
                name='Time*'
                placeholder={
                  index < time.length
                    ? `e.g. ${time[index]}`
                    : `e.g. ${time[index - 10]}`
                }
                value={work.time}
                onChange={(e) => onChange(e, work.id, 'time')}
              />
            </Grid>
            {work.points.map((point, index) => {
              return (
                <InputAreaBlock
                  key={point.id}
                  value={point.text}
                  color='primary.opposite'
                  bgcolor='primary.color'
                  name={`${index + 1}. Point`}
                  placeholder={
                    index < bullets.length
                      ? `e.g. ${bullets[index]}`
                      : `e.g. ${bullets[index - 10]}`
                  }
                  onChange={(e) => onChange(e, work.id, 'text', index)}
                  onDelete={() => onPointDelete(work.id, point.id)}
                />
              )
            })}
            <Flex type='center'>
              <DynamicButton
                type='button add'
                text='Add Point'
                color='black'
                onClick={() => onPointAdd(work.id)}
              />
            </Flex>
          </Grid>
        )
      })}
      <PrimarySecondaryButtons
        text='Experience'
        onAdd={onAdd}
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
              {work.company.trim() !== '' &&
                work.position.trim() !== '' &&
                work.time.trim() !== '' && (
                  <Box key={work.id}>
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
