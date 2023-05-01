// COMPONENTS
import { Box } from '@mui/material'
import HoverContainer from '../Containers/HoverContainer'
import Flex from '../Containers/Flex'
import Grid from '../Containers/Grid'
import Drag from '../Containers/Drag'
import DragButton from '../Buttons/DragButton'
import SkewTitle from '../Titles/SkewTitle'
import InputBlock from '../Inputs/InputBlock'
import DynamicButton from '../Buttons/DynamicButton'
// FUNCTIONALITY
import { useEffect, useState } from 'react'
import { Draggable } from '@hello-pangea/dnd'
import Placeholders from '../../Functions/placeholders'
import { getSectionData } from '../../Functions/getSavedData'

function Position({ onDelete, id, index, sections, setSections }) {
  const [onEdit, setOnEdit] = useState(false)
  const [open, setOpen] = useState(false)

  const example = ''
  const [position, setPosition] = useState(() => getSectionData(example, id))
  const [positionOld, setPositionOld] = useState('')

  const [placeholder, setPlaceholder] = useState(
    Placeholders.getPositionRandom()
  )

  function handleEditStart() {
    setPositionOld(position)
    setOnEdit(true)
  }

  function handleEditEnd() {
    setOnEdit(false)
    setPositionOld(null)

    setSections((prev) => {
      console.log(prev, '1')
      const updatedSections = prev.map((section) =>
        section.id === id ? { ...section, content: position } : section
      )
      localStorage.setItem('sections', JSON.stringify(updatedSections))
      console.log(updatedSections, '2')
      return updatedSections
    })
  }

  function handleDonePress() {
    handleEditEnd()
    handleSnackbarChange()
    // disable hanging ripple
    document.activeElement.blur()
  }

  function handleSnackbarChange() {
    if (position !== positionOld) setOpen(true)
  }

  function handleChange(e) {
    setPosition(e.target.value)
  }

  useEffect(() => {
    // Get random placeholder when position empty
    if (!onEdit) setPlaceholder(Placeholders.getPositionRandom())
    // Remove unnecessary spaces
    if (!onEdit) setPosition((prev) => prev.trim())
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
              title='Position'
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
                  <PositionEdit
                    position={position}
                    placeholder={placeholder}
                    onChange={handleChange}
                    onDonePress={handleDonePress}
                  />
                ) : (
                  <Box>{position || 'Position'}</Box>
                )}
              </Grid>
            </HoverContainer>
          </Drag>
        )
      }}
    </Draggable>
  )
}

function PositionEdit({ position, placeholder, onChange, onDonePress }) {
  return (
    <Grid gap={1.5}>
      <SkewTitle
        title='Position Section'
        color='primary.opposite'
        bgcolor='primary.main'
      />
      <InputBlock
        name='Position'
        value={position}
        color='primary.opposite'
        bgcolor='primary.violet'
        placeholder={placeholder}
        onChange={onChange}
      />
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

export default Position
