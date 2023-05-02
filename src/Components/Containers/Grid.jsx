import { Box } from '@mui/material'

function Grid({ children, type, gap, sx, ...props }) {
  const space = gap || gap === 0 ? gap : 1

  return (
    <Box
      {...props}
      sx={{
        display: 'grid',
        gridTemplateColumns: type,
        gap: space,
        width: 1,
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}

export default Grid
