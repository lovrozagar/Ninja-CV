import { Box, Typography } from '@mui/material'

function SkewTitle({ title }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box
        sx={{
          display: 'flex',
          width: 'fit-content',
          px: 1,
          textAlign: 'left',
          color: 'white',
          bgcolor: 'black',
          transform: 'skew(-25deg)',
        }}
      >
        <Typography
          sx={{
            width: 'fit-content',
            fontWeight: '500',
            transform: 'skew(25deg)',
          }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  )
}

export default SkewTitle
