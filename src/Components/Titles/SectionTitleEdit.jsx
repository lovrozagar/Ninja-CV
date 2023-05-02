import { Box, TextField } from '@mui/material'
import Flex from '../Containers/Flex'
import SkewTitle from './SkewTitle'

function SectionTitleEdit({ title, onChange }) {
  return (
    <Box>
      <Flex type='between'>
        <SkewTitle title='Section Title:' />
      </Flex>
      <TextField
        size='small'
        value={title}
        onChange={onChange}
        placeholder='Cool description here'
      />
    </Box>
  )
}

export default SectionTitleEdit
