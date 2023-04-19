import { Box } from '@mui/material'
import React from 'react'
import Grid from '../Containers/Grid'
import DynamicButton from './DynamicButton'

function PrimarySecondaryButtons({
  primaryText,
  secondaryText,
  onAdd,
  onDone,
}) {
  return (
    <Box mt={1}>
      <Grid type='1fr 1fr'>
        <DynamicButton
          type='button add outlined medium'
          text={secondaryText}
          onClick={onAdd}
          color='primary.main'
        />
        <DynamicButton
          type='button done outlined medium'
          text={primaryText}
          onClick={onDone}
          color='primary.opposite'
          sx={{
            backgroundColor: 'black',
            color: 'primary.text',
            '&:hover': { backgroundColor: 'primary.mainHover' },
          }}
        />
      </Grid>
    </Box>
  )
}

export default PrimarySecondaryButtons
