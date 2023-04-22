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
  const style = { justifyContent: 'center' }

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
          sx={{
            maxHeight: '40px',
            lineHeight: 0,
          }}
        >
          <MenuItem value='link' sx={style}>
            <Link />
          </MenuItem>
          <MenuItem value='Phone' sx={style}>
            <Phone />
          </MenuItem>
          <MenuItem value='Address' sx={style}>
            <Home />
          </MenuItem>
          <MenuItem value='Email' sx={style}>
            <Email />
          </MenuItem>
          <MenuItem value='Facebook' sx={style}>
            <Facebook />
          </MenuItem>
          <MenuItem value='Instagram' sx={style}>
            <Instagram />
          </MenuItem>
          <MenuItem value='LinkedIn' sx={style}>
            <LinkedIn />
          </MenuItem>
          <MenuItem value='GitHub' sx={style}>
            <GitHub />
          </MenuItem>
        </Select>
      </FormControl>
    </Grid>
  )
}

export default InputLogoBlock
