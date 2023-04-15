import { Box, Typography } from '@mui/material'

function SectionTitleView({ title }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        width: '100%',
      }}
    >
      <Typography variant='h6' sx={{ lineHeight: 1 }}>
        {title}
      </Typography>
      <Box
        sx={{
          position: 'relative',
          bottom: 2,
          borderBottom: 1,
          ml: 0.5,
        }}
      ></Box>
    </Box>
  )
}

export default SectionTitleView
