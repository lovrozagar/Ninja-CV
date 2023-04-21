import { useState, useEffect, useMemo } from 'react'
import { Box, TextField, Typography } from '@mui/material'
import HoverContainer from '../Containers/HoverContainer'
import Flex from '../Containers/Flex'
import Grid from '../Containers/Grid'
import SkewTitle from '../Titles/SkewTitle'
import InputBlock from '../Inputs/InputBlock'
import DynamicButton from '../Buttons/DynamicButton'
import uniqid from 'uniqid'

function Name() {
  const defaultPlaceholder = useMemo(() => {
    return {
      forename: '',
      surname: '',
    }
  }, [])
  const names = useMemo(
    () => [
      { forename: 'John', surname: 'Doe' },
      { forename: 'Jane', surname: 'Doe' },
      { forename: 'Bob', surname: 'Smith' },
      { forename: 'Alice', surname: 'Johnson' },
      { forename: 'Mike', surname: 'Davis' },
      { forename: 'Samantha', surname: 'Lee' },
      { forename: 'Chris', surname: 'Wilson' },
      { forename: 'Emily', surname: 'Garcia' },
      { forename: 'David', surname: 'Hernandez' },
      { forename: 'Jessica', surname: 'Rodriguez' },
    ],
    []
  )

  const [onEdit, setOnEdit] = useState(false)
  const [name, setName] = useState(defaultPlaceholder)
  const [placeholder, setPlaceholder] = useState([
    { forename: 'John', surname: 'Doe' },
  ])

  useEffect(() => {
    if (!onEdit && name.forename.trim() === '' && name.surname.trim() === '') {
      setPlaceholder(names[Math.floor(Math.random() * names.length)])
    }
  }, [onEdit, name, names])

  function handleChange(e, key) {
    setName((prevName) => ({ ...prevName, [key]: e.target.value }))
  }

  function handleDone() {
    setOnEdit(false)
  }

  return (
    <HoverContainer fn={setOnEdit} onEdit={onEdit}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          width: '100%',
          minHeight: '3.5rem',
        }}
      >
        {onEdit ? (
          <NameEdit
            name={name}
            forenamePlaceholder={placeholder.forename}
            surnamePlaceholder={placeholder.surname}
            onChange={handleChange}
            onDone={handleDone}
          />
        ) : (
          <NameView name={name} />
        )}
      </Box>
    </HoverContainer>
  )
}

function NameEdit({
  name,
  forenamePlaceholder,
  surnamePlaceholder,
  onChange,
  onDone,
}) {
  return (
    <Grid gap={1.5}>
      <SkewTitle title='Name' color='primary.opposite' bgcolor='primary.main' />
      <Grid type='1fr 1fr'>
        <InputBlock
          htmlFor={uniqid()}
          name='Forename'
          value={name.forename}
          color='primary.opposite'
          bgcolor='primary.violet'
          placeholder={`e.g. ${forenamePlaceholder}`}
          onChange={(e) => onChange(e, 'forename')}
        />
        <InputBlock
          htmlFor={uniqid()}
          name='Surname'
          value={name.surname}
          color='primary.opposite'
          bgcolor='primary.violet'
          placeholder={`e.g. ${surnamePlaceholder}`}
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
