import Grid from '../Containers/Grid'

function BreakpointGrid({ children }) {
  const styling = {
    gridTemplateColumns: '1fr',
    '@media (min-width: 600px)': {
      gridTemplateColumns: '1fr 1fr',
    },
  }
  return <Grid sx={styling}>{children}</Grid>
}

export default BreakpointGrid
