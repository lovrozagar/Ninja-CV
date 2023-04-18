import { Box } from '@mui/material'

function Grid({ children, type, gap, sx }) {
  const space = gap || gap === 0 ? gap : 1

  return (
    <Box
      sx={{
        ...sx,
        display: 'grid',
        gridTemplateColumns: type,
        gap: space,
        width: 1,
      }}
    >
      {children}
    </Box>
  )
}

export default Grid
