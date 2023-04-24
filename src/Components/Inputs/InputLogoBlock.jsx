import { useRef } from 'react'
import { FormControl, Select, MenuItem, Box } from '@mui/material'
import {
  Email,
  LinkedIn,
  Phone,
  Home,
  Facebook,
  Instagram,
  GitHub,
  Link,
} from '@mui/icons-material'
import Grid from '../Containers/Grid'
import SkewTitle from '../Titles/SkewTitle'

function InputLogoBlock({ name, color, bgcolor, link, onLogoSelect }) {
  const selectRef = useRef(null)

  const selectStyling = {
    maxHeight: '40px',
    lineHeight: 0,
    borderRadius: 1,
    bgcolor: 'primary.lightGrey',
    '&:not(:focus, :focus-within)': {
      fieldset: {
        border: 'none',
        outline: 'none',
      },
    },
  }

  const menuItemStyling = {
    justifyContent: 'center',
  }

  return (
    <Grid gap={0.5}>
      <Box
        onClick={() => {
          selectRef.current.click()
        }}
      >
        <Box sx={{ pointerEvents: 'none' }}>
          <SkewTitle title={name} color={color} bgcolor={bgcolor} />
        </Box>
      </Box>
      <FormControl fullWidth>
        <Select
          ref={selectRef}
          value={link?.logo || 'link'}
          onChange={(e) => onLogoSelect(e)}
          size='small'
          sx={selectStyling}
        >
          <MenuItem value='link' sx={menuItemStyling}>
            <Link />
          </MenuItem>
          <MenuItem value='Phone' sx={menuItemStyling}>
            <Phone />
          </MenuItem>
          <MenuItem value='Address' sx={menuItemStyling}>
            <Home />
          </MenuItem>
          <MenuItem value='Email' sx={menuItemStyling}>
            <Email />
          </MenuItem>
          <MenuItem value='Facebook' sx={menuItemStyling}>
            <Facebook />
          </MenuItem>
          <MenuItem value='Instagram' sx={menuItemStyling}>
            <Instagram />
          </MenuItem>
          <MenuItem value='LinkedIn' sx={menuItemStyling}>
            <LinkedIn />
          </MenuItem>
          <MenuItem value='GitHub' sx={menuItemStyling}>
            <GitHub />
          </MenuItem>
        </Select>
      </FormControl>
    </Grid>
  )
}

export default InputLogoBlock
