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
    <Typography variant='h5' fontWeight='600' lineHeight='1'>
      {title}
    </Typography>
  )
}

function BottomLine() {
  const styling = {
    position: 'relative',
    bottom: 4,
    height: '100%',
    borderBottom: 1,
    ml: 0.5,
    '&::before': {
      content: '""',
      position: 'absolute',
      zIndex: 10,
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      boxShadow: '0 3px 0px -1px currentColor',
      opacity: 0.25,
    },
  }

  return <Box sx={styling}></Box>
}

export default SectionTitleView
