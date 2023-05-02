import {
  Box,
  Button,
  FormControl,
  Select,
  MenuItem,
  Typography,
} from '@mui/material'
import { Add } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import Flex from '../Containers/Flex'

function AddSection({ length, onAdd }) {
  const defaultValue = 'Add Section'
  const [selectedValue, setSelectedValue] = useState(defaultValue)

  useEffect(() => {
    if (selectedValue !== 'Add Section') setSelectedValue(defaultValue)
  }, [selectedValue])

  const containerStyling = {
    display: 'flex',
    justifyContent: 'end',
    margin: length > 0 ? '0.5rem 0 0 auto' : '0 0.25rem 0 auto',
    '@media print': {
      display: 'none',
    },
  }
  const buttonStyling = {
    p: 0,
    textTransform: 'none',
  }
  const hiddenStyling = { display: 'none' }

  return (
    <Box sx={containerStyling}>
      <Button tabIndex={-1} sx={buttonStyling}>
        <FormControl>
          <Select
            size='small'
            value={selectedValue}
            onChange={onAdd}
            onClose={() => document.activeElement.blur()}
          >
            <MenuItem value='Add Section' sx={hiddenStyling}>
              <Flex gap={0.5}>
                <Add sx={{ fontSize: '1rem' }} />
                <Typography sx={{ fontSize: '0.925rem' }}>
                  Add Section
                </Typography>
              </Flex>
            </MenuItem>
            <MenuItem value='Skills'>Skills</MenuItem>
            <MenuItem value='Work Experience'>Work Experience</MenuItem>
            <MenuItem value='Personal Projects'>Personal Projects</MenuItem>
            <MenuItem value='Education'>Education</MenuItem>
            <MenuItem value='About Me'>About Me</MenuItem>
            <MenuItem value='Name'>Name</MenuItem>
            <MenuItem value='Position'>Position</MenuItem>
            <MenuItem value='Links'>Links</MenuItem>
          </Select>
        </FormControl>
      </Button>
    </Box>
  )
}

export default AddSection
