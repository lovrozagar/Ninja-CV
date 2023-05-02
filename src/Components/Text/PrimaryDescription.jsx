import { Typography } from '@mui/material'
import Flex from '../Containers/Flex'

function PrimaryDescription({ left, right }) {
  return (
    <Flex type='between' sx={{ rowGap: 0 }}>
      <Typography fontSize={16} fontWeight='600'>
        {left}
      </Typography>
      <Typography fontSize={14} fontWeight='300' fontStyle='italic'>
        {right}
      </Typography>
    </Flex>
  )
}

export default PrimaryDescription
