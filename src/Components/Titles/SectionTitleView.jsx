import { Box, Typography } from '@mui/material'
import Grid from '../Containers/Grid'

function SectionTitleView({ title }) {
  return (
    <Grid type='auto 1fr' gap={0}>
      <Title title={title} />
      <BottomLine />
    </Grid>
  )
}

function Title({ title }) {
  return (
    <Typography variant='h5' fontWeight='600' lineHeight='1' gutterBottom>
      {title}
    </Typography>
  )
}

function BottomLine() {
  return (
    <Box
      sx={{
        position: 'relative',
        bottom: 12,
        borderBottom: 1,
        boxShadow: '0 1px rgba(0, 0, 0, 0.25)',
        ml: 0.5,
      }}
    ></Box>
  )
}

export default SectionTitleView
