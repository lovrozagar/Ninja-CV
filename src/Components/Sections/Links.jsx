import { Box } from '@mui/material'
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
import { useEffect, useMemo, useState } from 'react'
import HoverContainer from '../Containers/HoverContainer'
import SkewTitle from '../Titles/SkewTitle'
import InputLogoBlock from '../Inputs/InputLogoBlock'
import Grid from '../Containers/Grid'
import PrimarySecondaryButtons from '../Buttons/PrimarySecondaryButtons'
import IndexDeleteTitle from '../Titles/IndexDeleteTitle'
import InputBlock from '../Inputs/InputBlock'

function Links() {
  const defaultValue = useMemo(
    () => [
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
    ],
    []
  )
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

  function handleLinkAdd() {
    setLinks((prevLinks) => [...prevLinks, { logo: '', link: '', name: '' }])
  }

  function handleDone() {
    setOnEdit(false)
    console.log(onEdit)
  }

  function handlePlaceholderChange(e, index) {
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

  function handleLogoSelect(e, index) {
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
        {onEdit ? (
          <LinksEdit
            links={links}
            onLinkAdd={handleLinkAdd}
            onLinkChange={handleLinkChange}
            onLinkDelete={handleLinkDelete}
            onPlaceholderChange={handlePlaceholderChange}
            onLogoSelect={handleLogoSelect}
            onDone={handleDone}
          />
        ) : (
          <div></div>
        )}
      </Box>
    </HoverContainer>
  )
}

function LinksEdit({
  links,
  onLinkAdd,
  onLinkChange,
  onLinkDelete,
  onPlaceholderChange,
  onLogoSelect,
  onDone,
}) {
  return (
    <Grid gap={1.5}>
      <SkewTitle
        title='Links: URL | Email | Custom'
        color='primary.opposite'
        bgcolor='primary.main'
      />
      {links.map((link, index) => {
        return (
          <Box key={index}>
            <Grid type='1fr 100px'>
              <Box gridColumn='1/3'>
                <IndexDeleteTitle
                  title={`${index + 1}. Link`}
                  onDelete={() => onLinkDelete(index)}
                />
              </Box>
              <InputBlock
                htmlFor={`placeholder-${index}`}
                name='Placeholder'
                color='primary.opposite'
                bgcolor='primary.violet'
                placeholder='Link name'
                value={link.name}
                onChange={(e) => onPlaceholderChange(e, index)}
                size='small'
              />
              <InputLogoBlock
                name='Logo'
                color='primary.opposite'
                bgcolor='primary.violet'
                link={link}
                onLogoSelect={(e) => onLogoSelect(e, index)}
              />
              <Grid sx={{ gridColumn: '1/3' }}>
                <InputBlock
                  htmlFor={`hyperlink-${index}`}
                  name='Hyperlink'
                  color='primary.opposite'
                  bgcolor='primary.violet'
                  placeholder='Full URL'
                  value={link.link}
                  onChange={(e) => onLinkChange(e, index)}
                />
              </Grid>
            </Grid>
          </Box>
        )
      })}
      <PrimarySecondaryButtons
        primaryText='Done'
        secondaryText='Add Link'
        onAdd={onLinkAdd}
        onDone={onDone}
      />
    </Grid>
  )
}

export default Links
