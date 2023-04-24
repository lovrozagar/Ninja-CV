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
import { useState, useEffect, useMemo } from 'react'
import { Draggable } from '@hello-pangea/dnd'
import Placeholders from '../../Functions/placeholders'

function Name({ onDelete, id, index }) {
  const defaultPlaceholder = useMemo(() => {
    return {
      forename: '',
      surname: '',
    }
  }, [])
  const [onEdit, setOnEdit] = useState(false)
  const [name, setName] = useState(defaultPlaceholder)
  const [placeholder, setPlaceholder] = useState(
    Placeholders.getFullNameRandom()
  )

  function handleChange(e, key) {
    setName((prevName) => ({ ...prevName, [key]: e.target.value }))
  }

  function handleDone() {
    setOnEdit(false)
  }

  useEffect(() => {
    // Get random placeholder when position empty
    if (!onEdit) {
      setPlaceholder(Placeholders.getFullNameRandom())
    }
    // Remove unnecessary spaces
    if (!onEdit)
      setName((prev) => ({
        forename: prev.forename.trim(),
        surname: prev.surname.trim(),
      }))
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
              fn={setOnEdit}
              onEdit={onEdit}
              onDelete={onDelete}
              isDragging={snapshot.isDragging}
            >
              <Grid type='center'>
                {onEdit ? (
                  <NameEdit
                    name={name}
                    placeholder={placeholder}
                    onChange={handleChange}
                    onDone={handleDone}
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

function NameEdit({ name, placeholder, onChange, onDone }) {
  return (
    <Grid gap={1.5}>
      <SkewTitle
        title='Name Section'
        color='primary.opposite'
        bgcolor='primary.main'
      />
      <Grid type='1fr 1fr'>
        <InputBlock
          name='Forename'
          value={name.forename}
          color='primary.opposite'
          bgcolor='primary.violet'
          placeholder={placeholder.forename}
          onChange={(e) => onChange(e, 'forename')}
        />
        <InputBlock
          name='Surname'
          value={name.surname}
          color='primary.opposite'
          bgcolor='primary.violet'
          placeholder={placeholder.surname}
          onChange={(e) => onChange(e, 'surname')}
        />
      </Grid>
      <Flex type='end'>
        <DynamicButton
          text='Done'
          type='button done contained medium'
          mainColor='black'
          onClick={onDone}
        />
      </Flex>
    </Grid>
  )
}

function NameView({ name }) {
  return (
    <Flex gap={1.5} type='center'>
      <Typography variant='h4' sx={{ fontSize: '2.5rem', fontWeight: '200' }}>
        {name.forename.trim() || 'Forename'}
      </Typography>
      <Typography variant='h4' sx={{ fontSize: '2.5rem', fontWeight: '500' }}>
        {name.surname.trim() || 'Surname'}
      </Typography>
    </Flex>
  )
}

export default Name
