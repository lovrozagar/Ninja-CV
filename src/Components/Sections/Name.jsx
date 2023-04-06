import { useState, useEffect } from 'react'
import { Box, TextField, Typography } from '@mui/material'
import HoverContainer from '../Containers/HoverContainer'

function Name() {
  const namePlaceholder = {
    forename: 'Forename',
    surname: 'Surname',
  }
  const [onEdit, setOnEdit] = useState(false)
  const [name, setName] = useState(namePlaceholder)

  function handleOnChange(e, key) {
    setName({ ...name, [key]: e.target.value })
  }

  return (
    <HoverContainer fn={setOnEdit} onEdit={onEdit}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          width: '100%',
        }}
      >
        {onEdit
          ? Object.keys(name).map((key) => {
              return (
                <TextField
                  key={key}
                  value={name[key]}
                  inputProps={{ maxLength: 12 }}
                  onChange={(e) => handleOnChange(e, key)}
                  placeholder={key === 'Forename' ? 'Forename' : 'Surname'}
                  sx={{
                    maxLength: '10',
                    flex: '1',
                    '& input': {
                      fontSize: '1rem',
                    },
                  }}
                />
              )
            })
          : Object.keys(name).map((key, index) => {
              return (
                <Typography
                  key={key}
                  variant='h3'
                  sx={{ fontWeight: index === 0 ? '200' : '400' }}
                >
                  {name[key]}
                </Typography>
              )
            })}
      </Box>
    </HoverContainer>
  )
}

export default Name
