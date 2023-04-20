import { Box } from '@mui/material'

function Flex({ children, type, gap, sx }) {
  const space = gap || gap === 0 ? gap : 1
  let justifyContent = null

  switch (type) {
    case 'between':
      justifyContent = 'space-between'
      break
    case 'around':
      justifyContent = 'space-between'
      break
    case 'evenly':
      justifyContent = 'space-between'
      break
    case 'center':
      justifyContent = 'center'
      break
    case 'end':
      justifyContent = 'flex-end'
      break
    default:
      justifyContent = 'flex-start'
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent,
        gap: space,
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}

export default Flex
