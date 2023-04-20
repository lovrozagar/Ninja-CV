import { Box, FormControl, Select, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import HoverContainer from '../Containers/HoverContainer'

function AddSection({ onAdd }) {
  const defaultValue = 'Add Section'
  const [selectedValue, setSelectedValue] = useState(defaultValue)

  useEffect(() => {
    if (selectedValue !== 'Add Section') setSelectedValue(defaultValue)
  }, [selectedValue])

  return (
    <Box sx={{ width: 'max(25%, 175px)', margin: '0.5rem 0 0 auto' }}>
      <HoverContainer fn={() => {}}>
        <FormControl fullWidth>
          <Select size='small' value={selectedValue} onChange={onAdd}>
            <MenuItem
              value='Add Section'
              sx={{
                display: 'none',
              }}
            >
              Add Section
            </MenuItem>
            <MenuItem value='Skills'>Skills</MenuItem>
            <MenuItem value='Work Experience'>Work Experience</MenuItem>
            <MenuItem value='Personal Projects'>Personal Projects</MenuItem>
            <MenuItem value='Education'>Education</MenuItem>
            <MenuItem value='About Me'>About Me</MenuItem>
            <MenuItem value='Custom'>Custom</MenuItem>
          </Select>
        </FormControl>
      </HoverContainer>
    </Box>
  )
}

export default AddSection
