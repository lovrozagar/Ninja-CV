import { Box, TextField } from '@mui/material'
import Flex from '../Containers/Flex'
import SkewTitle from './SkewTitle'
import ResetButton from '../Buttons/ResetButton'

function SectionTitleEdit({ title, onReset, onChange }) {
  return (
    <Box sx={{ mb: 1 }}>
      <Flex type='between'>
        <SkewTitle title='Section Title:' />
        <ResetButton onClick={onReset} />
      </Flex>
      <TextField
        size='small'
        fullWidth
        value={title}
        onChange={onChange}
        placeholder='Cool description here'
        gutterBottom
      />
    </Box>
  )
}

export default SectionTitleEdit
