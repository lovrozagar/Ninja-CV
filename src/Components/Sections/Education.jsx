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

function Education({ onDelete }) {
  // INIT VALUES
  const defaultTitle = 'Education'
  const newEducation = {
    company: '',
    location: '',
    position: '',
    time: '',
    points: [{ text: '', id: uniqid() }],
    id: uniqid(),
  }

  // HOOKS
  const defaultEducation = useMemo(
    () => [
      {
        school: 'Ninja School of Engineering',
        location: 'Zagreb, Croatia',
        profession: 'Computer Scientist',
        time: 'Sep 2015 - May 2019',
        id: uniqid(),
        points: [
          {
            text: 'Learned the basics of different computer science fields.',
            id: uniqid(),
          },
        ],
      },
    ],
    []
  )
  const [education, setEducation] = useState(defaultEducation)
  const [title, setTitle] = useState(defaultTitle)
  const [onEdit, setOnEdit] = useState(false)

  // Delete Empty Work Experiences or Points
  useEffect(() => {
    if (!onEdit) {
      setEducation((prev) =>
        prev
          .map((education) => {
            const usedPoints = education.points.filter(
              (point) => point.text.trim() !== ''
            )
            return { ...education, points: usedPoints }
          })
          .filter((work) => {
            if (
              work.school.trim() === '' &&
              work.location.trim() === '' &&
              work.profession.trim() === '' &&
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
    setEducation((prev) =>
      prev.map((education) => {
        if (education.id !== id) return education

        if (pointsIndex !== null) {
          const points = [...education.points]
          const point = {
            ...points[pointsIndex],
            text: e.target.value,
          }
          points[pointsIndex] = point

          return { ...education, points }
        }

        return { ...education, [property]: e.target.value }
      })
    )
  }

  function handleEducationDelete(id) {
    setEducation((prev) => {
      if (prev.length === 1) {
        return [newEducation]
      } else {
        return prev.filter((education) => education.id !== id)
      }
    })
  }

  function handlePointDelete(educationId, pointId) {
    setEducation((prev) =>
      prev.map((education) => {
        if (education.id !== educationId) return education

        const newPoints = education.points.filter(
          (point) => point.id !== pointId
        )

        return { ...education, points: newPoints }
      })
    )
  }

  function handlePointAdd(id) {
    setEducation((prev) =>
      prev.map((education) => {
        if (education.id !== id) return education

        return {
          ...education,
          points: [...education.points, { text: '', id: uniqid() }],
        }
      })
    )
  }

  function handleAdd() {
    setEducation((prev) => [...prev, newEducation])
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
          <EducationEdit
            title={title}
            onTitleReset={handleTitleReset}
            onTitleChange={handleTitleChange}
            education={education}
            onEducationDelete={handleEducationDelete}
            onChange={handleChange}
            onPointAdd={handlePointAdd}
            onPointDelete={handlePointDelete}
            onAdd={handleAdd}
            onDone={handleDone}
          />
        ) : (
          <EducationView title={title} education={education} />
        )}
      </Grid>
    </HoverContainer>
  )
}

function EducationEdit({
  title,
  onTitleReset,
  onTitleChange,
  education,
  onEducationDelete,
  onChange,
  onPointAdd,
  onPointDelete,
  onAdd,
  onDone,
}) {
  const schools = [
    'MIT',
    'Caltech',
    'Duke University',
    'Yale University',
    'Harvard University',
    'Stanford University',
    'Columbia University',
    'Princeton University',
    'University of Chicago',
    'Johns Hopkins University',
  ]

  const locations = [
    'Zagreb, HR',
    'Tokyo, JP',
    'Remote',
    'Berlin, DE',
    'San Francisco, CA',
  ]

  const professions = [
    'Computer Science',
    'Nursing',
    'Psychology',
    'Business Administration',
    'Engineering',
    'Education',
    'Graphic Design',
    'Journalism',
    'Criminal Justice',
    'Marketing',
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
        button='restore'
        color='primary.text'
        bgcolor='black'
        name='Section Title'
        placeholder='e.g Education'
        value={title}
        onClick={onTitleReset}
        onChange={onTitleChange}
      />
      {education.map((ed, index) => {
        return (
          <Grid key={ed.id}>
            <Grid type='1fr 1fr'>
              <Box gridColumn='1/3'>
                <IndexDeleteTitle
                  title={`${index + 1}. Education`}
                  onDelete={() => onEducationDelete(ed.id)}
                />
              </Box>
              <InputBlock
                color='primary.opposite'
                bgcolor='primary.violet'
                name='School*'
                placeholder={
                  index < schools.length
                    ? `e.g. ${schools[index]}`
                    : `e.g. ${schools[index - 10]}`
                }
                value={ed.school}
                onChange={(e) => onChange(e, ed.id, 'school')}
              />
              <InputBlock
                color='primary.opposite'
                bgcolor='primary.violet'
                name='Location'
                placeholder={
                  index < locations.length
                    ? `e.g. ${locations[index]}`
                    : `e.g. ${locations[index - 5]}`
                }
                value={ed.location}
                onChange={(e) => onChange(e, ed.id, 'location')}
              />
            </Grid>
            <Grid type='1fr 1fr'>
              <InputBlock
                color='primary.opposite'
                bgcolor='primary.violet'
                name='Profession / Certification*'
                placeholder={
                  index < professions.length
                    ? `e.g. ${professions[index]}`
                    : `e.g. ${professions[index - 10]}`
                }
                value={ed.profession}
                onChange={(e) => onChange(e, ed.id, 'profession')}
              />
              <InputBlock
                color='primary.opposite'
                bgcolor='primary.violet'
                name='Time*'
                placeholder={
                  index < time.length
                    ? `e.g. ${time[index]}`
                    : `e.g. ${time[index - 10]}`
                }
                value={ed.time}
                onChange={(e) => onChange(e, ed.id, 'time')}
              />
            </Grid>
            {ed.points.map((point, index) => {
              return (
                <InputAreaBlock
                  key={point.id}
                  value={point.text}
                  color='primary.opposite'
                  bgcolor='primary.violet'
                  name={`${index + 1}. Point`}
                  placeholder={
                    index < bullets.length
                      ? `e.g. ${bullets[index]}`
                      : `e.g. ${bullets[index - 10]}`
                  }
                  onChange={(e) => onChange(e, ed.id, 'text', index)}
                  onDelete={() => onPointDelete(ed.id, point.id)}
                />
              )
            })}
            <Flex>
              <DynamicButton
                mainColor='black'
                type='button add'
                text='Add Point'
                onClick={() => onPointAdd(ed.id)}
              />
            </Flex>
          </Grid>
        )
      })}
      <PrimarySecondaryButtons
        primaryText='Done'
        secondaryText='Add Education'
        onAdd={onAdd}
        onDone={onDone}
      />
    </Grid>
  )
}

function EducationView({ title, education }) {
  return (
    <Box>
      <SectionTitleView title={title} />
      <Grid>
        {education.map((ed) => {
          return (
            <Box key={ed.id}>
              {ed.school.trim() !== '' &&
                ed.profession.trim() !== '' &&
                ed.time.trim() !== '' && (
                  <Box key={ed.id}>
                    <PrimaryDescription left={ed.school} right={ed.location} />
                    <SecondaryDescription
                      left={ed.profession}
                      right={ed.time}
                    />
                    <Points array={ed.points} />
                  </Box>
                )}
            </Box>
          )
        })}
      </Grid>
    </Box>
  )
}

export default Education
