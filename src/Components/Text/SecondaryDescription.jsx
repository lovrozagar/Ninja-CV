import { Typography } from '@mui/material'
import Flex from '../Containers/Flex'

function SecondaryDescription({ left, right }) {
  const containerStyling = {
    mb: 0.3,
    rowGap: 0,
  }
  const capsStyling = {
    fontSize: '12px',
    fontWeight: '500',
    letterSpacing: 0.5,
    transform: 'scale(0.95)',
    textTransform: 'uppercase',
    '&::first-letter': {
      fontSize: '17px',
      fontWeight: '400',
    },
  }
  const italicStyling = {
    fontSize: 12,
    fontWeight: '200',
    fontStyle: 'italic',
  }

  return (
    <Flex type='between' sx={containerStyling}>
      <Flex gap={0.1}>
        {left.split(' ').map((word, index) => {
          return (
            <Typography key={index} sx={capsStyling}>
              {word}
            </Typography>
          )
        })}
      </Flex>
      <Typography sx={italicStyling}>{right}</Typography>
    </Flex>
  )
}

export default SecondaryDescription
