import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import HoverContainer from '../Containers/HoverContainer'
import Flex from '../Containers/Flex'
import Grid from '../Containers/Grid'
import SkewTitle from '../Titles/SkewTitle'
import InputBlock from '../Inputs/InputBlock'
import DynamicButton from '../Buttons/DynamicButton'
import Placeholders from '../../Functions/placeholders'

function Position({ onDelete }) {
  const [position, setPosition] = useState('')
  const [onEdit, setOnEdit] = useState(false)
  const [placeholder, setPlaceholder] = useState(
    Placeholders.getPositionRandom()
  )

  function handleOnChange(e) {
    setPosition(e.target.value)
  }

  function handleDone() {
    setOnEdit(false)
  }

  useEffect(() => {
    // Get random placeholder when position empty
    if (!onEdit) setPlaceholder(Placeholders.getPositionRandom())
    // Remove unnecessary spaces
    if (!onEdit) setPosition((prev) => prev.trim())
  }, [onEdit])

  return (
    <HoverContainer fn={setOnEdit} onEdit={onEdit} onDelete={onDelete}>
      <Grid>
        {onEdit ? (
          <PositionEdit
            position={position}
            placeholder={placeholder}
            onChange={handleOnChange}
            onDone={handleDone}
          />
        ) : (
          <Box>{position || 'Position'}</Box>
        )}
      </Grid>
    </HoverContainer>
  )
}

function PositionEdit({ position, placeholder, onChange, onDone }) {
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
          onClick={onDone}
        />
      </Flex>
    </Grid>
  )
}

export default Position
