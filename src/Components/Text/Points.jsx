import { Box, Typography } from '@mui/material'
import Flex from '../Containers/Flex'

function Points({ array, display, noBullet }) {
  const bullet = <>&#183;</>

  const wrapperStyling = {
    display: (display || null) !== 'inline' ? 'block' : 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    rowGap: 0,
    columnGap: 1,
  }
  const containerStyling = {
    flexWrap: 'nowrap',
    alignItems: 'start',
    width: 'auto',
    mb: 0.5,
    textAlign: 'start',
    textJustify: 'inter-word',
  }
  const bulletStyling = {
    display: noBullet ? 'none' : 'auto',
    fontSize: 18,
    lineHeight: 1,
    fontWeight: 'bold',
    textAlign: 'start',
    textAlignLast: 'left',
  }
  const textStyling = {
    display: 'inline',
    fontSize: 13,
    fontWeight: '400',
    textAlign: 'start',
    textAlignLast: 'left',
  }

  return (
    <Box sx={wrapperStyling}>
      {array.map((point, index) => {
        return (
          <Flex key={index} sx={containerStyling}>
            <Typography sx={bulletStyling}>{bullet}</Typography>
            <Typography sx={textStyling}>{point.text}</Typography>
          </Flex>
        )
      })}
    </Box>
  )
}

export default Points
