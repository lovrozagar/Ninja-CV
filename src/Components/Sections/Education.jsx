import { useEffect, useMemo, useState } from 'react'
import { Box } from '@mui/material'
import HoverContainer from '../Containers/HoverContainer'
import Flex from '../Containers/Flex'
import Grid from '../Containers/Grid'
import SectionTitleView from '../Titles/SectionTitleView'
import PrimaryDescription from '../Text/PrimaryDescription'
import SecondaryDescription from '../Text/SecondaryDescription'
import IndexDeleteTitle from '../Titles/IndexDeleteTitle'
import InputBlock from '../Inputs/InputBlock'
import InputAreaBlock from '../Inputs/InputAreaBlock'
import Points from '../Text/Points'
import DynamicButton from '../Buttons/DynamicButton'
import PrimarySecondaryButtons from '../Buttons/PrimarySecondaryButtons'
import Placeholders from '../../Functions/placeholders'
import uniqid from 'uniqid'

function Education({ onDelete }) {
  const [onEdit, setOnEdit] = useState(false)
  const defaultTitle = 'Education'
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
  const [title, setTitle] = useState(defaultTitle)
  const [education, setEducation] = useState(defaultEducation)
  const newEducation = {
    school: '',
    location: '',
    profession: '',
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

  function handleEducationAdd() {
    setEducation((prev) => [...prev, newEducation])
  }

  function handleEducationChange(e, id, property) {
    setEducation((prev) =>
      prev.map((ed) => {
        if (ed.id !== id) return ed
        return { ...ed, [property]: e.target.value }
      })
    )
  }

  function handleEducationDelete(id) {
    setEducation((prev) => {
      if (prev.length === 1) {
        return [newEducation]
      } else {
        return prev.filter((ed) => ed.id !== id)
      }
    })
  }

  function handlePointAdd(id) {
    setEducation((prev) =>
      prev.map((ed) => {
        if (ed.id !== id) return ed

        return {
          ...ed,
          points: [...ed.points, newPoint],
        }
      })
    )
  }

  function handlePointChange(e, educationId, pointId) {
    setEducation((prev) =>
      prev.map((ed) => {
        if (ed.id !== educationId) return ed
        const newPoints = ed.points.map((point) => {
          if (point.id !== pointId) return point
          return { ...point, text: e.target.value }
        })
        return { ...ed, points: newPoints }
      })
    )
  }

  function handlePointDelete(educationId, pointId) {
    setEducation((prev) =>
      prev.map((ed) => {
        if (ed.id !== educationId) return ed

        const newPoints = ed.points.filter((point) => point.id !== pointId)

        return { ...ed, points: newPoints }
      })
    )
  }

  function handleDone() {
    setOnEdit(false)
  }

  useEffect(() => {
    if (!onEdit) {
      setEducation((prev) =>
        prev
          // Remove unnecessary spaces
          .map((ed) => {
            const usedPoints = ed.points
              .map((point) => ({ ...point, text: point.text.trim() }))
              // Delete Empty Points
              .filter((point) => point.text !== '')
            return {
              ...ed,
              company: ed.school.trim(),
              location: ed.location.trim(),
              position: ed.profession.trim(),
              time: ed.time.trim(),
              points: usedPoints,
            }
          })
          // Delete Empty Education
          .filter((ed) => {
            if (
              ed.school === '' &&
              ed.location === '' &&
              ed.profession === '' &&
              ed.time === ''
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
          <EducationEdit
            title={title}
            onTitleChange={handleTitleChange}
            onTitleReset={handleTitleReset}
            education={education}
            onEducationAdd={handleEducationAdd}
            onEducationChange={handleEducationChange}
            onEducationDelete={handleEducationDelete}
            onPointAdd={handlePointAdd}
            onPointChange={handlePointChange}
            onPointDelete={handlePointDelete}
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
  onTitleChange,
  onTitleReset,
  education,
  onEducationAdd,
  onEducationChange,
  onEducationDelete,
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
                placeholder={Placeholders.getSchool(index)}
                value={ed.school}
                onChange={(e) => onEducationChange(e, ed.id, 'school')}
              />
              <InputBlock
                color='primary.opposite'
                bgcolor='primary.violet'
                name='Location'
                placeholder={Placeholders.getLocation(index)}
                value={ed.location}
                onChange={(e) => onEducationChange(e, ed.id, 'location')}
              />
            </Grid>
            <Grid type='1fr 1fr'>
              <InputBlock
                color='primary.opposite'
                bgcolor='primary.violet'
                name='Profession / Certification*'
                placeholder={Placeholders.getProfession(index)}
                value={ed.profession}
                onChange={(e) => onEducationChange(e, ed.id, 'profession')}
              />
              <InputBlock
                color='primary.opposite'
                bgcolor='primary.violet'
                name='Time*'
                placeholder={Placeholders.getTime(index)}
                value={ed.time}
                onChange={(e) => onEducationChange(e, ed.id, 'time')}
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
                  placeholder={Placeholders.getEducationPoint(index)}
                  onChange={(e) => onPointChange(e, ed.id, point.id)}
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
        onAdd={onEducationAdd}
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
              {ed.school !== '' && ed.profession !== '' && ed.time !== '' && (
                <Box key={ed.id}>
                  <PrimaryDescription left={ed.school} right={ed.location} />
                  <SecondaryDescription left={ed.profession} right={ed.time} />
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
