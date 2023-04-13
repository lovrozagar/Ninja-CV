import {
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Button,
} from '@mui/material'
import {
  Email,
  LinkedIn,
  Phone,
  Home,
  Facebook,
  Instagram,
  GitHub,
  Link,
  Delete,
} from '@mui/icons-material'
import { useEffect, useMemo, useState } from 'react'
import HoverContainer from '../Containers/HoverContainer'
import PrimaryButton from '../Buttons/PrimaryButton'
import SecondaryButton from '../Buttons/SecondaryButton'

function Links() {
  const defaultValue = useMemo(() => [
    {
      logo: 'Email',
      link: 'lovro.zagar5@gmail.com',
      name: 'Ninjamail',
    },
    {
      logo: 'GitHub',
      link: 'https://github.com/lovrozagar',
      name: 'GitHub',
    },
    {
      logo: 'LinkedIn',
      link: 'https://www.linkedin.com/in/lovrozagar/',
      name: 'LinkedIn',
    },
  ])
  const [links, setLinks] = useState(defaultValue)
  const [onEdit, setOnEdit] = useState(false)
  const [editCheck, setEditCheck] = useState(false)

  useEffect(() => {
    if (links.length === 0 && !onEdit) {
      setLinks(defaultValue)
    }
    if (links.some((link) => link.name.trim() === '') && !onEdit) {
      const formattedLinks = links.map((link) => {
        if (link.name === '') link.name = '[empty link]'
        return link
      })
      setLinks(formattedLinks)
    }
    if (
      links.some((link) => link.name === '[empty link]') &&
      onEdit &&
      !editCheck
    ) {
      const formattedLinks = links.map((link) => {
        if (link.name === '[empty link]') link.name = ''
        return link
      })
      setLinks(formattedLinks)
      setEditCheck(true)
    }
    if (!onEdit) {
      setEditCheck(false)
    }
  }, [links, onEdit, editCheck, defaultValue])

  function getLinkLogo(logoName) {
    let logo

    switch (logoName) {
      case 'Email':
        logo = <Email />
        break
      case 'Phone':
        logo = <Phone />
        break
      case 'Address':
        logo = <Home />
        break
      case 'Facebook':
        logo = <Facebook />
        break
      case 'Instagram':
        logo = <Instagram />
        break
      case 'LinkedIn':
        logo = <LinkedIn />
        break
      case 'GitHub':
        logo = <GitHub />
        break
      default:
        logo = <Link />
        break
    }

    return logo
  }

  function addLink() {
    setLinks((prevLinks) => [...prevLinks, { logo: '', link: '', name: '' }])
  }

  function handleDone() {
    setOnEdit(false)
    console.log(onEdit)
  }

  function handleLinkNameChange(e, index) {
    setLinks((prevLinks) =>
      prevLinks.map((link, linkIndex) => {
        return index === linkIndex ? { ...link, name: e.target.value } : link
      })
    )
  }

  function handleLinkChange(e, index) {
    setLinks((prevLinks) =>
      prevLinks.map((link, linkIndex) => {
        return index === linkIndex ? { ...link, link: e.target.value } : link
      })
    )
  }

  function handleSelect(e, index) {
    setLinks((prevLinks) =>
      prevLinks.map((link, linkIndex) => {
        return index === linkIndex ? { ...link, logo: e.target.value } : link
      })
    )
  }

  function handleLinkDelete(index) {
    setLinks((prevLinks) => prevLinks.filter((link) => link !== links[index]))
  }

  return (
    <HoverContainer fn={setOnEdit} onEdit={onEdit}>
      <Box
        sx={{
          display: onEdit ? 'grid' : 'flex',
          width: onEdit ? '100%' : 'auto',
          gap: '0.5rem',
        }}
      >
        {links.map((link, index) => {
          return onEdit ? (
            <div key={index}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  m: '0 0.5rem 0.25rem 0.5rem',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      width: 'fit-content',
                      px: 1,
                      textAlign: 'left',
                      color: 'white',
                      bgcolor: 'black',
                      transform: 'skew(-25deg)',
                    }}
                  >
                    <Typography
                      sx={{
                        width: 'fit-content',
                        fontWeight: '500',
                        transform: 'skew(25deg)',
                      }}
                    >
                      {index + 1}. Link
                    </Typography>
                  </Box>
                </Box>
                <Button onClick={() => handleLinkDelete(index)}>
                  <Delete />
                </Button>
              </Box>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  gap: '0.5rem',
                }}
              >
                <FormControl fullWidth>
                  <Select
                    value={link.logo || 'link'}
                    onChange={(e) => handleSelect(e, index)}
                    size='small'
                    sx={{
                      maxHeight: '40px',
                      lineHeight: 0,
                    }}
                  >
                    <MenuItem value='link'>
                      <Link />
                    </MenuItem>
                    <MenuItem value='Phone'>
                      <Phone />
                    </MenuItem>
                    <MenuItem value='Address'>
                      <Home />
                    </MenuItem>
                    <MenuItem value='Email'>
                      <Email />
                    </MenuItem>
                    <MenuItem value='Facebook'>
                      <Facebook />
                    </MenuItem>
                    <MenuItem value='Instagram'>
                      <Instagram />
                    </MenuItem>
                    <MenuItem value='LinkedIn'>
                      <LinkedIn />
                    </MenuItem>
                    <MenuItem value='GitHub'>
                      <GitHub />
                    </MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  placeholder='Link name'
                  value={link.name}
                  onChange={(e) => handleLinkNameChange(e, index)}
                  size='small'
                />
                <TextField
                  placeholder='Full URL'
                  value={link.link}
                  onChange={(e) => handleLinkChange(e, index)}
                  size='small'
                  sx={{ gridColumn: '1/3' }}
                />
              </Box>
            </div>
          ) : (
            <Box
              key={index}
              sx={{ display: 'flex', alignContent: 'center', gap: '0.25rem' }}
            >
              {getLinkLogo(link.logo)}
              <div
                sx={{
                  display: 'flex',
                }}
              >
                {link.name}
              </div>
            </Box>
          )
        })}
        {onEdit && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.5rem',
              mt: links.length ? '1rem' : '0',
            }}
          >
            <SecondaryButton onClick={addLink}>Add Link</SecondaryButton>
            <PrimaryButton onClick={handleDone}>Done</PrimaryButton>
          </Box>
        )}
      </Box>
    </HoverContainer>
  )
}

export default Links
