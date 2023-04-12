import { useState, useEffect, useMemo } from 'react'
import { Box, TextField, Typography } from '@mui/material'
import HoverContainer from '../Containers/HoverContainer'

function Name() {
  const namePlaceholder = useMemo(() => {
    return {
      forename: 'Forename',
      surname: 'Surname',
    }
  }, [])

  const [onEdit, setOnEdit] = useState(false)
  const [name, setName] = useState(namePlaceholder)

  useEffect(() => {
    if (name.forename.includes(' ') && !onEdit) {
      setName({ ...name, forename: name.forename.trim() })
    }
    if (name.surname.includes(' ') && !onEdit) {
      setName({ ...name, surname: name.surname.trim() })
    }
  }, [name, onEdit])

  useEffect(() => {
    if (!name.forename && !onEdit) {
      setName({ ...name, forename: 'Forename' })
    }
    if (!name.surname && !onEdit) {
      setName({ ...name, surname: 'Surname' })
    }
  }, [name, namePlaceholder, onEdit])

  useEffect(() => {
    if (onEdit && name.forename === 'Forename') {
      setName({ ...name, forename: '' })
    }
    if (onEdit && name.surname === 'Surname') {
      setName({ ...name, surname: '' })
    }
  }, [name, onEdit])

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
          ? Object.keys(name).map((key, index) => {
              return (
                <TextField
                  key={key}
                  value={name[key]}
                  inputProps={{ maxLength: 12 }}
                  onChange={(e) => handleOnChange(e, key)}
                  placeholder={index === 0 ? 'Forename' : 'Surname'}
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
