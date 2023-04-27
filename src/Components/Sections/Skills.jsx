//COMPONENTS
import { Box } from '@mui/material'
import HoverContainer from '../Containers/HoverContainer'
import Flex from '../Containers/Flex'
import Grid from '../Containers/Grid'
import Drag from '../Containers/Drag'
import DragButton from '../Buttons/DragButton'
import SectionTitleView from '../Titles/SectionTitleView'
import InputBlock from '../Inputs/InputBlock'
import Points from '../Text/Points'
import PrimarySecondaryButtons from '../Buttons/PrimarySecondaryButtons'
// FUNCTIONALITY
import { useState, useEffect } from 'react'
import { Draggable } from '@hello-pangea/dnd'
import Placeholders from '../../Functions/placeholders'
import deepCompareValue from '../../Functions/deepCompareValue'
import uniqid from 'uniqid'

function Skills({ onDelete, id, index }) {
  const [onEdit, setOnEdit] = useState(false)
  const [open, setOpen] = useState(false)
  const defaultTitle = 'Skills'
  const defaultSkills = [
    { text: 'Ninja TeamWork', id: uniqid() },
    { text: 'Ninja Development', id: uniqid() },
    { text: 'Ninja Communication', id: uniqid() },
  ]
  const [title, setTitle] = useState(defaultTitle)
  const [titleOld, setTitleOld] = useState(null)
  const [skills, setSkills] = useState(defaultSkills)
  const [skillsOld, setSkillsOld] = useState(null)
  const newSkill = { text: '', id: uniqid() }

  function handleEditStart() {
    setTitleOld(title)
    setSkillsOld(structuredClone(skills))
    setOnEdit(true)
  }

  function handleEditEnd() {
    setOnEdit(false)
    setTitleOld(null)
    setSkillsOld(null)
    setSkills((prev) => prev.filter((skill) => skill.text !== ''))
  }

  function handleDonePress() {
    handleEditEnd()
    handleSnackbarChange()
    // disable hanging ripple
    document.activeElement.blur()
  }

  function handleSnackbarChange() {
    if ((!deepCompareValue(skills, skillsOld) || title !== titleOld) && !open)
      setOpen(true)
  }

  function handleTitleChange(e) {
    setTitle(e.target.value)
  }

  function handleTitleReset() {
    setTitle(defaultTitle)
  }

  function handleSkillAdd() {
    setSkills((prev) => [...prev, newSkill])
  }

  function handleSkillChange(e, id) {
    setSkills((prev) =>
      prev.map((skill) => {
        return skill.id === id ? { ...skill, text: e.target.value } : skill
      })
    )
  }

  function handleSkillDelete(id) {
    if (skills.length === 1) setSkills((prev) => [{ ...prev[0], text: '' }])
    else setSkills((prev) => prev.filter((skill) => skill.id !== id))
  }

  useEffect(() => {
    if (!onEdit) {
      // Remove unnecessary spaces
      setTitle((prev) => prev.trim())
      setSkills((prev) =>
        prev
          // Remove unnecessary spaces
          .map((skill) => {
            return { ...skill, text: skill.text.trim() }
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
                  <SkillsEdit
                    title={title}
                    onTitleChange={handleTitleChange}
                    onTitleReset={handleTitleReset}
                    skills={skills}
                    onSkillAdd={handleSkillAdd}
                    onSkillChange={handleSkillChange}
                    onSkillDelete={handleSkillDelete}
                    onDonePress={handleDonePress}
                  />
                ) : (
                  <SkillsView title={title} skills={skills} />
                )}
              </Grid>
            </HoverContainer>
          </Drag>
        )
      }}
    </Draggable>
  )
}

function SkillsEdit({
  title,
  onTitleReset,
  onTitleChange,
  skills,
  onSkillDelete,
  onSkillChange,
  onSkillAdd,
  onDonePress,
}) {
  return (
    <Grid>
      <InputBlock
        color='primary.opposite'
        bgcolor='primary.main'
        button='restore'
        name='Section Title'
        placeholder='e.g Skills'
        value={title}
        onClick={onTitleReset}
        onChange={onTitleChange}
      />
      {skills.map((skill, index) => {
        return (
          <Grid key={skill.id}>
            <InputBlock
              color='primary.opposite'
              bgcolor='primary.violet'
              button='x'
              name={`${index + 1}. Skill`}
              placeholder={Placeholders.getSkill(index)}
              value={skill.text}
              onChange={(e) => onSkillChange(e, skill.id)}
              onClick={() => onSkillDelete(skill.id)}
            />
          </Grid>
        )
      })}
      <PrimarySecondaryButtons
        primaryText='Done'
        secondaryText='Add Skill'
        onAdd={onSkillAdd}
        onDone={onDonePress}
      />
    </Grid>
  )
}

function SkillsView({ title, skills }) {
  return (
    <Box>
      <SectionTitleView title={title || 'Skills'} />
      <Flex type='center'>
        <Points array={skills} display='inline' />
      </Flex>
    </Box>
  )
}

export default Skills
