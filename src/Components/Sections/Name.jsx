import { useState, useEffect, useMemo } from 'react'
import { Box, TextField, Typography } from '@mui/material'
import HoverContainer from '../Containers/HoverContainer'

function Name() {
  const defaultPlaceholder = useMemo(() => {
    return {
      forename: 'Forename',
      surname: 'Surname',
    }
  }, [])
  const [onEdit, setOnEdit] = useState(false)
  const [name, setName] = useState(defaultPlaceholder)

  useEffect(() => {
    if (name.forename.includes(' ') && !onEdit) {
      setName((prevName) => ({
        ...prevName,
        forename: prevName.forename.trim(),
      }))
    }
    if (name.surname.includes(' ') && !onEdit) {
      setName((prevName) => ({ ...prevName, surname: prevName.surname.trim() }))
    }
  }, [name, onEdit])

  useEffect(() => {
    if (!name.forename && !onEdit) {
      setName((prevName) => ({
        ...prevName,
        forename: defaultPlaceholder.forename,
      }))
    }
    if (!name.surname && !onEdit) {
      setName((prevName) => ({
        ...prevName,
        surname: defaultPlaceholder.surname,
      }))
    }
  }, [name, defaultPlaceholder, onEdit])

  useEffect(() => {
    if (onEdit && name.forename === defaultPlaceholder.forename) {
      setName((prevName) => ({ ...prevName, forename: '' }))
    }
    if (onEdit && name.surname === defaultPlaceholder.surname) {
      setName((prevName) => ({ ...prevName, surname: '' }))
    }
  }, [name, onEdit, defaultPlaceholder])

  function handleOnChange(e, key) {
    setName((prevName) => ({ ...prevName, [key]: e.target.value }))
  }

  return (
    <HoverContainer fn={setOnEdit} onEdit={onEdit}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          justifyContent: 'center',
          gap: '0.5rem',
          width: '100%',
          minHeight: '3.5rem',
        }}
      >
        {Object.keys(name).map((key, index) => {
          const isForename = key === 'forename'
          return onEdit ? (
            <TextField
              key={key}
              value={name[key] || ''}
              inputProps={{ maxLength: 13 }}
              onChange={(e) => handleOnChange(e, key)}
              placeholder={
                isForename
                  ? defaultPlaceholder.forename
                  : defaultPlaceholder.surname
              }
              sx={{
                flex: '1',
                '& input': {
                  fontSize: '1rem',
                },
              }}
            />
          ) : (
            <Typography
              key={key}
              variant='h3'
              sx={{
                fontWeight: isForename ? '200' : '400',
                textAlign: isForename ? 'right' : 'left',
              }}
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
