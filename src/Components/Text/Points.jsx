import { Box, Typography } from '@mui/material'
import Flex from '../Containers/Flex'

function Points({ array, display }) {
  const bullet = <>&#183;</>

  return (
    <Box
      display={(display || null) !== 'inline' ? 'block' : 'flex'}
      justifyContent='center'
      flexWrap='wrap'
      gap={1}
    >
      {array.map((point, index) => {
        return (
          <>
            {point.text.trim() !== '' && (
              <Flex
                key={index}
                sx={{
                  width: 'auto',
                  flexWrap: 'nowrap',
                  textAlign: 'start',
                  textJustify: 'inter-word',
                }}
              >
                <Typography
                  display='inline'
                  textAlign='start'
                  lineHeight={1}
                  fontSize={18}
                  fontWeight='bold'
                  sx={{ textAlignLast: 'left' }}
                >
                  {bullet}
                </Typography>
                <Typography
                  display='inline'
                  textAlign='start'
                  fontSize={13}
                  fontWeight='400'
                  sx={{ textAlignLast: 'left', wordBreak: 'normal' }}
                >
                  {point.text}
                </Typography>
              </Flex>
            )}
          </>
        )
      })}
    </Box>
  )
}

export default Points
