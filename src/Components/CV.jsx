import { Paper } from '@mui/material'
import Name from './Sections/Name'

import PrimaryButton from './Buttons/PrimaryButton'
import SecondaryButton from './Buttons/SecondaryButton'

function CV() {
  return (
    <Paper
      sx={{
        maxWidth: '210mm',
        minHeight: '295mm',
        m: '0 auto',
        p: '0.5rem',
        textAlign: 'center',
      }}
    >
      <Name />
      <PrimaryButton>Preview</PrimaryButton>
      <SecondaryButton>Download</SecondaryButton>
    </Paper>
  )
}

export default CV
