import { Box } from '@mui/material'

function Flex({ children, type, gap, sx }) {
  const space = gap ? gap : 1
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
        ...sx,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent,
        gap: space,
      }}
    >
      {children}
    </Box>
  )
}

export default Flex
