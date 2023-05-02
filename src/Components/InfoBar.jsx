// COMPONENTS
import { forwardRef, useState } from 'react'
import { Box, Container } from '@mui/material'
import Grid from './Containers/Grid'
import DynamicButton from './Buttons/DynamicButton'
import InfoDialog from './Dialogs/InfoDialog'
// FUNCTIONALITY
import ReactToPrint from 'react-to-print'

const InfoBar = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false)
  const instructions = [
    {
      logo: 'add',
      description: 'Add',
      text: (
        <>
          click on the 'Add Section' dropdown and select the section to add,
          duplicate sections are allowed, any section can be renamed and used as
          a template for a custom section
        </>
      ),
    },
    {
      logo: 'edit',
      description: 'Edit',
      text: (
        <>
          click on the section to enter edit mode, click on the button 'Done' or
          click outside to exit edit mode
        </>
      ),
    },
    {
      logo: 'drag',
      description: 'Drag',
      text: (
        <>
          click and hold (or tab on + 'space') the drag dots on the left of the
          section
          <br />
          to confirm: drag in spot and release
          <br />
          to cancel: 'escape' or invalid action
        </>
      ),
    },
    {
      logo: 'delete',
      description: 'Delete',
      text: (
        <>
          click and hold the section until it turns red
          <br />
          to confirm: release while red
          <br />
          to cancel: slide off section, release while not red
        </>
      ),
    },
  ]

  function handleDialogToggle() {
    setOpen(!open)
  }

  const containerStyling = {
    '&&': {
      p: '0 0.6rem',
    },
  }
  const boxStyling = {
    display: 'grid',
    gap: 0,
    p: 0.25,
    '@media (min-width: 330px)': {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 1,
    },
  }
  const buttonStyling = {
    fontWeight: '600',
  }
  const previewStyling = {
    position: 'static',
    left: 0,
    '@media (min-width: 330px)': {
      position: 'relative',
      left: -15,
    },
  }

  return (
    <Grid
      type='between'
      position='fixed'
      zIndex='1'
      top='0'
      width='100%'
      bgcolor='primary.barMain'
      py={0.25}
      boxShadow='0px -12px 30px 0px rgba(125, 137, 248, 0.5)'
      borderRadius='0 0 4px 4px'
    >
      <Container sx={containerStyling}>
        <Box type='center' sx={boxStyling}>
          <DynamicButton
            type='button shuriken'
            text='NinjaCV'
            mainColor='violet'
            reverse
            onClick={handleDialogToggle}
            sx={{ ...buttonStyling }}
          />
          <ReactToPrint
            trigger={() => (
              <DynamicButton
                text='Preview'
                mainColor='grey'
                fontWeight='bold'
                sx={{ ...buttonStyling, ...previewStyling }}
              />
            )}
            content={() => ref.current}
            pageStyle={'@page { size: A4; }'}
          />
          <DynamicButton
            type='button info'
            text='Info'
            mainColor='violet'
            onClick={handleDialogToggle}
            sx={buttonStyling}
          />
        </Box>
      </Container>
      <InfoDialog
        contentArray={instructions}
        open={open}
        close={handleDialogToggle}
      />
    </Grid>
  )
})

export default InfoBar
