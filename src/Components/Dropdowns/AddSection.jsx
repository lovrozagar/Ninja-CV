import { Box, FormControl, Select, MenuItem } from '@mui/material'
import HoverContainer from '../Containers/HoverContainer'

function AddSection() {
  return (
    <Box sx={{ width: 'max(50%, 150px)', margin: '0.5rem auto 0 auto' }}>
      <HoverContainer fn={() => {}}>
        <FormControl fullWidth>
          <Select size='small' defaultValue='Add Section'>
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
