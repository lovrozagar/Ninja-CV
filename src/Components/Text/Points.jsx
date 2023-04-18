import { Box, Typography } from '@mui/material'
import Flex from '../Containers/Flex'

function Points({ array }) {
  return (
    <Box>
      {array.map((point, index) => (
        <Flex key={index}>
          <Typography lineHeight={1} fontSize={18} fontWeight='bold'>
            &#183;
          </Typography>
          <Typography fontSize={13} fontWeight='400'>
            {point.text}
          </Typography>
        </Flex>
      ))}
    </Box>
  )
}

export default Points
