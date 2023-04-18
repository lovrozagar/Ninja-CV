import { Typography } from '@mui/material'
import Flex from '../Containers/Flex'

function SecondaryDescription({ left, right }) {
  return (
    <Flex type='between'>
      <Flex gap={0.1}>
        {left.split(' ').map((word, index) => {
          return (
            <Typography
              key={index}
              fontWeight='500'
              sx={{
                textTransform: 'uppercase',
                fontSize: '12px',
                letterSpacing: 0.5,
                transform: 'scale(0.95)',
                '&::first-letter': {
                  fontSize: '17px',
                  fontWeight: '400',
                },
              }}
            >
              {word}
            </Typography>
          )
        })}
      </Flex>
      <Typography
        fontSize={12}
        fontWeight='200'
        fontStyle='italic'
        gutterBottom
      >
        {right}
      </Typography>
    </Flex>
  )
}

export default SecondaryDescription
