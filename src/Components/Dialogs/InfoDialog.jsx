import {
  Dialog,
  Paper,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Divider,
} from '@mui/material'
import { Add, Edit, Height, Clear } from '@mui/icons-material'
import Flex from '../Containers/Flex'
import Grid from '../Containers/Grid'
import DynamicButton from '../Buttons/DynamicButton'

function InfoDialog({ contentArray, open, close }) {
  return (
    <Dialog
      onClose={close}
      open={open}
      PaperProps={{ style: { bgcolor: 'primary.barMain' } }}
      scroll='body'
    >
      <Paper sx={{ bgcolor: 'primary.barMain' }}>
        <DialogTitle fontWeight='600' color='primary.violet'>
          <Flex type='between'>
            Information
            <DynamicButton
              type='icon x default medium'
              mainColor='violet'
              onClick={close}
            />
          </Flex>
        </DialogTitle>
        <DialogContents contentArray={contentArray} onClose={close} />
        <DialogActions sx={{ p: '0 1.5rem 1.5rem 1.5rem' }}>
          <Flex type='end'>
            <DynamicButton
              type='button no-icon text large'
              text='Close'
              mainColor='violet'
              onClick={close}
            />
          </Flex>
        </DialogActions>
      </Paper>
    </Dialog>
  )
}

function DialogContents({ contentArray }) {
  return (
    <DialogContent sx={{ pb: 0 }}>
      <DialogContentText
        color='primary.mediumGrey'
        fontSize={14}
        fontStyle='italic'
        mb={2.5}
      >
        NinjaCV is a dynamic, customizable CV/Resume builder that helps you
        slice through the competition and land your dream job.
      </DialogContentText>
      <Grid gap={0.5}>
        <DialogContentText mb={0.5} fontWeight='600' color='primary.violet'>
          How To Use
        </DialogContentText>
        {contentArray.map((entry, index) => (
          <Grid key={index} gap={0.5}>
            <InstructionsEntry
              logo={entry.logo}
              description={entry.description}
              text={entry.text}
            />
            {index < contentArray.length - 1 ? (
              <Divider sx={{ bgcolor: 'primary.darkGrey' }} />
            ) : null}
          </Grid>
        ))}
      </Grid>
    </DialogContent>
  )
}

function InstructionsEntry({ logo, description, text }) {
  function getEntryIcon(logo) {
    const styling = { fontSize: 14, color: 'primary.mediumGrey' }
    let entryLogo = null

    switch (logo) {
      case 'add':
        entryLogo = <Add sx={styling} />
        break
      case 'edit':
        entryLogo = <Edit sx={styling} />
        break
      case 'drag':
        entryLogo = <Height sx={styling} />
        break
      case 'delete':
        entryLogo = <Clear sx={styling} />
        break
      default:
        entryLogo = null
    }

    return entryLogo
  }

  return (
    <Grid type='4.5rem 1fr' sx={{ alignItems: 'start' }}>
      <Flex gap={0.5}>
        {getEntryIcon(logo)}
        <DialogContentText fontSize={14} color='primary.mediumGrey'>
          {description}
        </DialogContentText>
      </Flex>
      <DialogContentText fontSize={14} color='primary.mediumGrey'>
        {text}
      </DialogContentText>
    </Grid>
  )
}

export default InfoDialog
