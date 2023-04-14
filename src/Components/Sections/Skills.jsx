import { useEffect, useState, useMemo } from 'react'
import { Box, TextField, Typography } from '@mui/material'
import HoverContainer from '../Containers/HoverContainer'
import SkewTitle from '../Utility/SkewTitle'
import PrimaryButton from '../Buttons/PrimaryButton'
import SecondaryButton from '../Buttons/SecondaryButton'
import DeleteButton from '../Buttons/DeleteButton'
import ResetButton from '../Buttons/ResetButton'
import uniqid from 'uniqid'

function Skills() {
  const defaultTitle = 'Skills'
  // HOOKS
  const defaultSkills = useMemo(
    () => [
      { name: 'Ninja TeamWork', id: uniqid() },
      { name: 'Ninja Development', id: uniqid() },
      { name: 'Ninja Communication', id: uniqid() },
    ],
    []
  )
  const [title, setTitle] = useState(defaultTitle)
  const [skills, setSkills] = useState(defaultSkills)
  const [onEdit, setOnEdit] = useState(false)

  useEffect(() => {
    if (!onEdit) {
      setSkills((prev) => prev.filter((skill) => skill.name.trim() !== ''))
    }
    if (!onEdit && skills.length === 0) setSkills(defaultSkills)
  }, [skills.length, onEdit, defaultSkills])

  // HANDLERS
  function handleAdd() {
    setSkills((prev) => [...prev, { name: '', id: uniqid() }])
  }

  function handleDone() {
    setOnEdit(false)
    document.activeElement.blur()
  }

  function handleDelete(id) {
    if (skills.length === 1) setSkills((prev) => [{ ...prev[0], name: '' }])
    else setSkills((prev) => prev.filter((skill) => skill.id !== id))
  }

  function handleChange(e, id) {
    setSkills((prev) =>
      prev.map((skill) => {
        return skill.id === id ? { ...skill, name: e.target.value } : skill
      })
    )
  }

  function handleTitleChange(e) {
    setTitle(e.target.value)
  }

  function handleTitleReset() {
    setTitle(defaultTitle)
  }

  return (
    <HoverContainer fn={setOnEdit} onEdit={onEdit} margin='wide'>
      <Box sx={{ display: 'grid', width: 1 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: onEdit ? '1fr' : 'auto 1fr',
          }}
        >
          {onEdit ? (
            <Box sx={{ mb: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <SkewTitle title='Section Title:' />
                <ResetButton onClick={handleTitleReset} />
              </Box>
              <TextField
                size='small'
                fullWidth
                value={title}
                onChange={handleTitleChange}
                placeholder='Cool description here'
              ></TextField>
            </Box>
          ) : (
            <Typography variant='h6' sx={{ lineHeight: 1 }}>
              {title}
            </Typography>
          )}
          <Box
            sx={{
              display: onEdit ? 'none' : 'block',
              position: 'relative',
              bottom: 2,
              borderBottom: 1,
            }}
          ></Box>
        </Box>
        {onEdit ? (
          <SkillsEdit
            skills={skills}
            onDelete={handleDelete}
            onChange={handleChange}
            onDone={handleDone}
            onAdd={handleAdd}
          />
        ) : (
          <SkillsView skills={skills} />
        )}
      </Box>
    </HoverContainer>
  )
}

function SkillsView({ skills }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 1,
      }}
    >
      {skills.map((skill, index) => (
        <div key={skill.id}>
          <span>{skill.name}</span>
          {index === skills.length - 1 ? null : (
            <span style={{ fontWeight: 'bold', marginLeft: '8px' }}>
              &#183;
            </span>
          )}
        </div>
      ))}
    </Box>
  )
}

function SkillsEdit({ skills, onDelete, onChange, onAdd, onDone }) {
  const ninjaSkills = [
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
    <Box sx={{ display: 'grid', gap: 1, width: 1 }}>
      {skills.map((skill, index) => (
        <Box key={skill.id}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <SkewTitle title={`${index + 1}. Skill`} />
            <DeleteButton handleClick={() => onDelete(skill.id)} />
          </Box>
          <TextField
            fullWidth
            size='small'
            value={skill.name}
            onChange={(e) => onChange(e, skill.id)}
            placeholder={
              index <= ninjaSkills.length ? ninjaSkills[index] : 'Another Skill'
            }
          />
        </Box>
      ))}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 1,
          m: '0.5rem 0 0 0',
        }}
      >
        <SecondaryButton onClick={onAdd}>Add Skill</SecondaryButton>
        <PrimaryButton onClick={onDone}>Done</PrimaryButton>
      </Box>
    </Box>
  )
}

export default Skills
