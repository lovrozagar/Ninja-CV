import { Box, TextField } from '@mui/material'
import SkewTitle from './SkewTitle'
import ResetButton from '../Buttons/ResetButton'

function SectionTitleEdit({ title, onReset, onChange }) {
  return (
    <Box sx={{ mb: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <SkewTitle title='Section Title:' />
        <ResetButton onClick={onReset} />
      </Box>
      <TextField
        size='small'
        fullWidth
        value={title}
        onChange={onChange}
        placeholder='Cool description here'
      />
    </Box>
  )
}

export default SectionTitleEdit
