import { useEffect, useState } from 'react'
import {
  Link,
  Dialog,
  Paper,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Divider,
} from '@mui/material'
import Grid from '../Containers/Grid'
import Flex from '../Containers/Flex'
import DynamicButton from '../Buttons/DynamicButton'

function LinkDialog({ open, onClose, onEdit, hyperlink }) {
  return (
    <Dialog onClose={onClose} open={open}>
      <Paper sx={{ bgcolor: 'primary.barMain' }}>
        <DialogTitle fontWeight='600' color='primary.violet'>
          <Flex type='between'>
            Direction
            <DynamicButton
              type='icon x default medium'
              mainColor='violet'
              onClick={onClose}
            />
          </Flex>
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: 14, color: 'primary.mediumGrey' }}>
            It appears that you have clicked a link. If you are trying to edit
            the section, select 'Edit', else proceed with 'Visit Link'
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: '0 1.5rem 1.5rem 1.5rem' }}>
          <Grid
            sx={{
              '@media (min-width: 480px)': {
                gridTemplateColumns: '1fr 1fr',
              },
            }}
          >
            <Link
              href={hyperlink}
              target='_blank'
              rel='noopener'
              underline='none'
              color='inherit'
            >
              <Grid>
                <DynamicButton
                  type='button no-icon outlined medium'
                  text='Visit Link'
                  mainColor='violet'
                  onClick={onClose}
                />
              </Grid>
            </Link>

            <DynamicButton
              type='button no-icon contained medium'
              text='Edit'
              mainColor='violet'
              onClick={onEdit}
            />
          </Grid>
        </DialogActions>
      </Paper>
    </Dialog>
  )
}

export default LinkDialog
