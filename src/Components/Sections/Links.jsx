import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { useState } from 'react'
import HoverContainer from '../Containers/HoverContainer'
import { Email, LinkedIn, Phone, Home, Link } from '@mui/icons-material'

function Links() {
  const defaultValue = [
    {
      logo: 'LinkedIn',
      link: 'https://www.linkedin.com/in/lovrozagar/',
      name: 'LinkedIn',
    },
    {
      logo: 'Email',
      link: 'lovro.zagar5@gmail.com ',
      name: 'Email',
    },
  ]
  const [links, setLinks] = useState(defaultValue)
  const [onEdit, setOnEdit] = useState(false)

  function getLinkLogo(logoName) {
    let logo

    switch (logoName) {
      case 'Email':
        logo = <Email />
        break
      case 'phone':
        logo = <Phone />
        break
      case 'home':
        logo = <Home />
        break
      case 'LinkedIn':
        logo = <LinkedIn />
        break
      default:
        logo = <Link />
        break
    }

    return logo
  }

  return (
    <HoverContainer fn={setOnEdit} onEdit={onEdit}>
      <Box
        sx={{
          display: 'flex',
          gap: '0.5rem',
        }}
      >
        {links.map((link) => {
          return onEdit ? (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '100px 1fr',
                gap: '0.5rem',
              }}
            >
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Logo</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  label='Logo'
                >
                  <MenuItem value={10}>Phone</MenuItem>
                  <MenuItem value={20}>Address</MenuItem>
                  <MenuItem value={30}>Email</MenuItem>
                  <MenuItem value={30}>LinkedIn</MenuItem>
                  <MenuItem value={30}>CustomLink</MenuItem>
                  <MenuItem value={30}>GitHub</MenuItem>
                </Select>
              </FormControl>
              <TextField placeholder='Link name' value={link.name} />
              <TextField
                placeholder='Full URL'
                value={link.link}
                sx={{ gridColumn: '1/3' }}
              />
            </Box>
          ) : (
            <Box sx={{ display: 'flex', gap: '0.25rem' }}>
              {getLinkLogo(link.logo)}
              {link.name}
            </Box>
          )
        })}
      </Box>
    </HoverContainer>
  )
}

export default Links
