//COMPONENTS
import { Typography } from '@mui/material'
import HoverContainer from '../Containers/HoverContainer'
import Flex from '../Containers/Flex'
import Grid from '../Containers/Grid'
import Drag from '../Containers/Drag'
import DragButton from '../Buttons/DragButton'
import SkewTitle from '../Titles/SkewTitle'
import InputBlock from '../Inputs/InputBlock'
import DynamicButton from '../Buttons/DynamicButton'
// FUNCTIONALITY
import { useState, useEffect } from 'react'
import { Draggable } from '@hello-pangea/dnd'
import Placeholders from '../../Functions/placeholders'
import deepCompareValue from '../../Functions/deepCompareValue'
import exampleOrLocal from '../../Functions/exampleOrLocal'

function Name({
  onDelete,
  id,
  index,
  sections,
  setSections,
  isExample = false,
}) {
  const [onEdit, setOnEdit] = useState(false)
  const [open, setOpen] = useState(false)

  const example = [{ forename: '' }, { surname: '' }]
  const [name, setName] = useState(() => exampleOrLocal(isExample, example, id))
  const [nameOld, setNameOld] = useState(null)

  const [placeholder, setPlaceholder] = useState(
    Placeholders.getFullNameRandom()
  )

  function handleEditStart() {
    setNameOld(structuredClone(name))
    setOnEdit(true)
  }

  function handleEditEnd() {
    setOnEdit(false)
    setNameOld(null)

    const updatedSection = sections.map((section) =>
      section.id === id ? { ...section, content: name } : section
    )

    setSections(updatedSection)
    localStorage.setItem('sections', JSON.stringify(updatedSection))
  }

  function handleDonePress() {
    handleEditEnd()
    handleSnackbarChange()
    // disable hanging ripple
    document.activeElement.blur()
  }

  function handleSnackbarChange() {
    if (!deepCompareValue(name, nameOld) && !open) setOpen(true)
  }

  function handleChange(e, key) {
    setName((prev) =>
      prev.map((namePart) =>
        namePart.hasOwnProperty(key) ? { [key]: e.target.value } : namePart
      )
    )
  }

  useEffect(() => {
    // Get random placeholder when position empty
    if (!onEdit) {
      setPlaceholder(Placeholders.getFullNameRandom())
    }
    // Remove unnecessary spaces
    if (!onEdit) {
      setName((prev) =>
        prev.map((namePartObj, index) => ({
          [index === 0 ? 'forename' : 'surname']:
            namePartObj[index === 0 ? 'forename' : 'surname'].trim(),
        }))
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
              title='Name'
              onEdit={onEdit}
              onEditStart={handleEditStart}
              onEditEnd={handleEditEnd}
              onDelete={onDelete}
              onSnackbarChange={handleSnackbarChange}
              isDragging={snapshot.isDragging}
              open={open}
              close={() => setOpen(false)}
            >
              <Grid type='center'>
                {onEdit ? (
                  <NameEdit
                    name={name}
                    placeholder={placeholder}
                    onChange={handleChange}
                    onDonePress={handleDonePress}
                  />
                ) : (
                  <NameView name={name} />
                )}
              </Grid>
            </HoverContainer>
          </Drag>
        )
      }}
    </Draggable>
  )
}

function NameEdit({ name, placeholder, onChange, onDonePress }) {
  return (
    <Grid gap={1.5}>
      <SkewTitle
        title='Name Section'
        color='primary.opposite'
        bgcolor='primary.main'
      />
      <Grid type='1fr 1fr'>
        {name.map((namePart, index) => (
          <InputBlock
            key={index}
            name={index === 0 ? 'forename' : 'surname'}
            value={namePart[index === 0 ? 'forename' : 'surname']}
            color='primary.opposite'
            bgcolor='primary.violet'
            length={16}
            placeholder={placeholder[index === 0 ? 'forename' : 'surname']}
            onChange={(e) => onChange(e, index === 0 ? 'forename' : 'surname')}
          />
        ))}
      </Grid>
      <Flex type='end'>
        <DynamicButton
          text='Done'
          type='button done contained medium'
          mainColor='black'
          onClick={onDonePress}
        />
      </Flex>
    </Grid>
  )
}

function NameView({ name }) {
  return (
    <Flex gap={1.5} type='center'>
      {name.map((namePart, index) => (
        <Typography
          key={index}
          variant='h4'
          fontSize='2.5rem'
          fontWeight={index === 0 ? 200 : 500}
        >
          {namePart[index === 0 ? 'forename' : 'surname'] ||
            (index === 0 ? 'Forename' : 'Surname')}
        </Typography>
      ))}
    </Flex>
  )
}

export default Name
