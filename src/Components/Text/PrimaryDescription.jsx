import { Typography } from '@mui/material'
import Flex from '../Containers/Flex'

function PrimaryDescription({ left, right }) {
  return (
    <Flex type='between'>
      <Typography fontSize={16} fontWeight='600' gutterBottom>
        {left}
      </Typography>
      <Typography
        fontSize={14}
        fontWeight='300'
        fontStyle='italic'
        gutterBottom
      >
        {right}
      </Typography>
    </Flex>
  )
}

export default PrimaryDescription
