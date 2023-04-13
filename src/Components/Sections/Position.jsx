import { Box, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import HoverContainer from '../Containers/HoverContainer'

function Position() {
  const defaultPlaceholder = 'Position'
  const [position, setPosition] = useState(defaultPlaceholder)
  const [onEdit, setOnEdit] = useState(false)

  useEffect(() => {
    if (position.includes(' ') && !onEdit) setPosition(position.trim())
  }, [position, onEdit])

  useEffect(() => {
    if (!position && !onEdit) setPosition(defaultPlaceholder)
  }, [position, onEdit])

  useEffect(() => {
    if (position === defaultPlaceholder && onEdit) setPosition('')
  }, [position, onEdit])

  function handleOnChange(e) {
    setPosition(e.target.value)
  }

  return (
    <HoverContainer fn={setOnEdit} onEdit={onEdit}>
      <Box
        height='1.5rem'
        width='100%'
        sx={{
          display: 'grid',
        }}
      >
        {onEdit ? (
          <TextField
            value={position || ''}
            placeholder='Position'
            onChange={handleOnChange}
            InputProps={{
              style: {
                fontSize: '0.85rem',
                height: '1.5rem',
              },
            }}
          ></TextField>
        ) : (
          <Box height='100%'>{position}</Box>
        )}
      </Box>
    </HoverContainer>
  )
}

export default Position
