import { useEffect, useState, useMemo } from 'react'
import { Box } from '@mui/material'
import HoverContainer from '../Containers/HoverContainer'
import Grid from '../Containers/Grid'
import Flex from '../Containers/Flex'
import uniqid from 'uniqid'
import SectionTitleView from '../Titles/SectionTitleView'
import InputBlock from '../Inputs/InputBlock'
import PrimarySecondaryButtons from '../Buttons/PrimarySecondaryButtons'
import Points from '../Text/Points'

function Skills({ onDelete }) {
  const defaultTitle = 'Skills'
  // HOOKS
  const defaultSkills = useMemo(
    () => [
      { text: 'Ninja TeamWork', id: uniqid() },
      { text: 'Ninja Development', id: uniqid() },
      { text: 'Ninja Communication', id: uniqid() },
    ],
    []
  )
  const [title, setTitle] = useState(defaultTitle)
  const [skills, setSkills] = useState(defaultSkills)
  const [onEdit, setOnEdit] = useState(false)

  useEffect(() => {
    if (!onEdit) {
      setSkills((prev) => prev.filter((skill) => skill.text.trim() !== ''))
    }
  }, [skills.length, onEdit, defaultSkills])

  // HANDLERS

  function handleTitleReset() {
    setTitle(defaultTitle)
  }

  function handleTitleChange(e) {
    setTitle(e.target.value)
  }

  function handleSkillDelete(id) {
    if (skills.length === 1) setSkills((prev) => [{ ...prev[0], text: '' }])
    else setSkills((prev) => prev.filter((skill) => skill.id !== id))
  }

  function handleSkillAdd() {
    setSkills((prev) => [...prev, { text: '', id: uniqid() }])
  }

  function handleDone() {
    setOnEdit(false)
    document.activeElement.blur()
  }

  function handleSkillChange(e, id) {
    setSkills((prev) =>
      prev.map((skill) => {
        return skill.id === id ? { ...skill, text: e.target.value } : skill
      })
    )
  }

  return (
    <HoverContainer
      fn={setOnEdit}
      onEdit={onEdit}
      onDelete={onDelete}
      margin='wide'
    >
      <Grid>
        {onEdit ? (
          <SkillsEdit
            title={title}
            onTitleReset={handleTitleReset}
            onTitleChange={handleTitleChange}
            skills={skills}
            onSkillDelete={handleSkillDelete}
            onSkillChange={handleSkillChange}
            onSkillAdd={handleSkillAdd}
            onDone={handleDone}
          />
        ) : (
          <SkillsView title={title} skills={skills} />
        )}
      </Grid>
    </HoverContainer>
  )
}

function SkillsView({ title, skills }) {
  return (
    <Box>
      <SectionTitleView title={title} />
      <Flex type='center'>
        <Points array={skills} display='inline' />
      </Flex>
    </Box>
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
  onDone,
}) {
  const skillPlaceholders = [
    'e.g. fruit slicing',
    'e.g. stealth',
    'e.g. shuriken throwing',
    'e.g. sneaking',
    'e.g. sword-fighting',
    'e.g. poisoning',
    'e.g. climbing',
    'e.g. trap-setting',
    'e.g. disguise',
    'e.g. acrobatics',
    'e.g. meditation',
    'e.g. mind control',
    'e.g. water walking',
    'e.g. blowgun mastery',
    'e.g. grappling',
    'e.g. invisibility',
    'e.g. explosives handling',
    'e.g. rope use',
    'e.g. diving',
    'e.g. teleportation',
    'e.g. fire manipulation',
  ]

  return (
    <Grid>
      <InputBlock
        color='primary.opposite'
        bgcolor='primary.main'
        type='between restore'
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
              type='between x'
              name={`${index + 1}. Skill`}
              placeholder={
                index < skillPlaceholders.length
                  ? skillPlaceholders[index]
                  : skillPlaceholders[index - 10]
              }
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
        onSkillAdd={onSkillAdd}
        onDone={onDone}
      />
    </Grid>
  )
}

export default Skills
