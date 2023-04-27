import { Box, Link } from '@mui/material'
import {
  Email,
  LinkedIn,
  Phone,
  Home,
  Facebook,
  Instagram,
  GitHub,
  Link as BasicLink,
} from '@mui/icons-material'
import HoverContainer from '../Containers/HoverContainer'
import Flex from '../Containers/Flex'
import Grid from '../Containers/Grid'
import Drag from '../Containers/Drag'
import DragButton from '../Buttons/DragButton'
import IndexDeleteTitle from '../Titles/IndexDeleteTitle'
import SkewTitle from '../Titles/SkewTitle'
import InputBlock from '../Inputs/InputBlock'
import InputLogoBlock from '../Inputs/InputLogoBlock'
import PrimarySecondaryButtons from '../Buttons/PrimarySecondaryButtons'
import LinkDialog from '../Dialogs/LinkDialog'
// FUNCTIONALITY
import { useEffect, useState } from 'react'
import { Draggable } from '@hello-pangea/dnd'
import Placeholders from '../../Functions/placeholders'
import deepCompareValue from '../../Functions/deepCompareValue'

function Links({ onDelete, id, index }) {
  const [onEdit, setOnEdit] = useState(false)
  const [open, setOpen] = useState(false)
  const [linkDialog, setLinkDialog] = useState(false)
  const defaultValue = [
    {
      placeholder: 'Email',
      hyperlink: 'lovro.zagar5@gmail.com',
      logo: 'Email',
    },
    {
      placeholder: 'Address',
      hyperlink: '10000 Zagreb, Croatia',
      logo: 'Address',
    },
    {
      placeholder: 'GitHub',
      hyperlink: 'https://github.com/lovrozagar',
      logo: 'GitHub',
    },
  ]

  const [links, setLinks] = useState(defaultValue)
  const [linksOld, setLinksOld] = useState(null)

  function getLinkLogo(logoName) {
    let logo

    switch (logoName) {
      case 'Email':
        logo = <Email fontSize='small' />
        break
      case 'Phone':
        logo = <Phone fontSize='small' />
        break
      case 'Address':
        logo = <Home fontSize='small' />
        break
      case 'Facebook':
        logo = <Facebook fontSize='small' />
        break
      case 'Instagram':
        logo = <Instagram fontSize='small' />
        break
      case 'LinkedIn':
        logo = <LinkedIn fontSize='small' />
        break
      case 'GitHub':
        logo = <GitHub fontSize='small' />
        break
      default:
        logo = <BasicLink fontSize='small' />
        break
    }

    return logo
  }

  function handleEditStart() {
    setLinksOld(structuredClone(links))
    setOnEdit(true)
  }

  function handleEditEnd() {
    setOnEdit(false)
    setLinksOld(null)
    setLinks((prev) =>
      prev.filter((link, index) =>
        index > 0 ? link.placeholder !== '' && link.hyperlink !== '' : true
      )
    )
  }

  function handleDonePress() {
    handleEditEnd()
    handleSnackbarChange()
    // disable hanging ripple
    document.activeElement.blur()
  }

  function handleSnackbarChange() {
    console.log(links, linksOld)
    if (!deepCompareValue(links, linksOld) && !open) setOpen(true)
  }

  function handleLinkAdd() {
    setLinks((prevLinks) => [
      ...prevLinks,
      { placeholder: '', logo: '', hyperlink: '' },
    ])
  }

  function guessLink(input) {
    // GUESS IF EMAIL
    const mailRegex = /^\S+@\S+\.\S+$/ // guess if link is mail
    const isEmail = mailRegex.test(input)
    if (isEmail) return `mailto:${input}`
    // GUESS IF PHONE NUMBER
    const numberRegex = /^\+?\d+$/
    const isNumber = numberRegex.test(input)
    if (isNumber) return `tel:${input}`
    // GUESS IF ADDRESS
    const isAddress = input.includes(' ') || input.includes(',')
    if (isAddress) {
      const searchQuery = input
        .split()
        .map((entry, index) => {
          if (index) return `+${entry}`
          return entry
        })
        .join()
      return `https://www.google.com/search?q=${searchQuery}`
    }
    // GUESS IF URL
    return input
  }

  function handlePlaceholderChange(e, index) {
    setLinks((prevLinks) =>
      prevLinks.map((link, linkIndex) => {
        return index === linkIndex
          ? { ...link, placeholder: e.target.value }
          : link
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

  function handleHyperlinkChange(e, index) {
    setLinks((prevLinks) =>
      prevLinks.map((link, linkIndex) => {
        return index === linkIndex
          ? { ...link, hyperlink: e.target.value }
          : link
      })
    )
  }

  function handleLinkDelete(index) {
    setLinks((prev) =>
      prev
        .map((link) => {
          if (prev.length === 1)
            return { placeholder: '', logo: 'link', hyperlink: '' }
          return link
        })
        .filter((link) => link !== links[index] || prev.length === 1)
    )
  }

  useEffect(() => {
    // Remove unnecessary spaces
    if (!onEdit) {
      setLinks((prev) =>
        prev.map((link) => ({
          ...link,
          placeholder: link.placeholder.trim(),
          hyperlink: link.hyperlink.trim(),
        }))
      )
    }
  }, [onEdit])

  return (
    <Box>
      <Draggable draggableId={id} index={index} direction='vertical'>
        {(provided, snapshot) => {
          return (
            <Drag onEdit={onEdit} provided={provided}>
              <DragButton
                onEdit={onEdit}
                isDragging={snapshot.isDragging}
                {...provided.dragHandleProps}
              />
              <HoverContainer
                title='Links'
                onEdit={onEdit}
                onEditStart={handleEditStart}
                onEditEnd={handleEditEnd}
                onDelete={onDelete}
                onSnackbarChange={handleSnackbarChange}
                isDragging={snapshot.isDragging}
                linkStop={linkDialog}
                open={open}
                close={() => setOpen(false)}
              >
                <Grid>
                  {onEdit ? (
                    <LinksEdit
                      links={links}
                      onLinkAdd={handleLinkAdd}
                      onPlaceholderChange={handlePlaceholderChange}
                      onLogoSelect={handleLogoSelect}
                      onHyperlinkChange={handleHyperlinkChange}
                      onLinkDelete={handleLinkDelete}
                      onDonePress={handleDonePress}
                    />
                  ) : (
                    <LinksView
                      links={links}
                      getLinkLogo={getLinkLogo}
                      guessLink={guessLink}
                      open={linkDialog}
                      setOpen={setLinkDialog}
                      onEditStart={handleEditStart}
                    />
                  )}
                </Grid>
              </HoverContainer>
            </Drag>
          )
        }}
      </Draggable>
    </Box>
  )
}

function LinksEdit({
  links,
  onLinkAdd,
  onPlaceholderChange,
  onLogoSelect,
  onHyperlinkChange,
  onLinkDelete,
  onDonePress,
}) {
  return (
    <Grid gap={1.5}>
      <SkewTitle
        title='Links Section'
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
                name='Placeholder'
                color='primary.opposite'
                bgcolor='primary.violet'
                placeholder={Placeholders.getLinkName(index)}
                value={link.placeholder}
                onChange={(e) => onPlaceholderChange(e, index)}
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
                  name='Hyperlink'
                  color='primary.opposite'
                  bgcolor='primary.violet'
                  placeholder={Placeholders.getUrl(index)}
                  value={link.hyperlink}
                  onChange={(e) => onHyperlinkChange(e, index)}
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
        onDone={onDonePress}
      />
    </Grid>
  )
}

function LinksView({
  links,
  getLinkLogo,
  guessLink,
  open,
  setOpen,
  onEditStart,
}) {
  const [hyperlink, setHyperlink] = useState(null)

  function handleOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  function handleEdit() {
    onEditStart()
    setOpen(false)
  }

  function handleLinkClick(e, hyperlink) {
    e.stopPropagation()
    setHyperlink(hyperlink)
    handleOpen()
  }

  return (
    <Flex type='center' gap={1.5}>
      {links.map((link, index) => {
        return (
          <Flex
            key={index}
            gap={0.5}
            onClick={(e) => handleLinkClick(e, guessLink(link.hyperlink))}
          >
            <Flex pointerEvents='hover'>{getLinkLogo(link.logo)}</Flex>
            <Flex pointerEvents='hover'>
              <Link
                href={link.hyperlink}
                color='inherit'
                underline='hover'
                pointerEvents='hover'
                onClick={(e) => e.preventDefault()}
              >
                {link.placeholder || '[empty link]'}
              </Link>
            </Flex>
          </Flex>
        )
      })}
      <LinkDialog
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        onEdit={handleEdit}
        hyperlink={hyperlink}
      />
    </Flex>
  )
}

export default Links
