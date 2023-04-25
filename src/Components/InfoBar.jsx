import { useState } from 'react'
import { Container, Typography, Link } from '@mui/material'
import Flex from './Containers/Flex'
import Grid from './Containers/Grid'
import DynamicButton from './Buttons/DynamicButton'
import InfoDialog from './Dialogs/InfoDialog'

function InfoBar() {
  const [open, setOpen] = useState(false)
  const instructions = [
    {
      logo: 'add',
      description: 'Add',
      text: (
        <>
          click on the 'Add Section' dropdown and select the section to add,
          duplicate sections are allowed
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

  return (
    <Grid
      type='between'
      position='fixed'
      zIndex='1'
      top='0'
      width='100%'
      bgcolor='primary.barMain'
      py={0.25}
    >
      <Container>
        <Flex type='between'>
          <Typography fontSize={14} color='primary.violet' fontWeight='bold'>
            NinjaCV
          </Typography>
          <Link
            href='https://github.com/lovrozagar'
            target='_blank'
            rel='noopener'
            underline='none'
            color='inherit'
          >
            <DynamicButton
              type='button github'
              text='GitHub'
              mainColor='grey'
            />
          </Link>
          <DynamicButton
            type='button info'
            text='Info'
            mainColor='violet'
            onClick={handleDialogToggle}
          />
        </Flex>
      </Container>
      <InfoDialog
        contentArray={instructions}
        open={open}
        close={handleDialogToggle}
      />
    </Grid>
  )
}

export default InfoBar
