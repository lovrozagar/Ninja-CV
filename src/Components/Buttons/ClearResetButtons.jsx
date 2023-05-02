import Grid from '../Containers/Grid'
import DynamicButton from './DynamicButton'

function ClearResetButtons({ onClear, onReset }) {
  const styling = {
    mb: 2.25,
    '@media (max-width: 330px)': {
      '&': {
        marginTop: '7.25rem',
      },
    },
    '@media print': {
      display: 'none',
    },
  }

  return (
    <Grid type='1fr 1fr' sx={styling}>
      <DynamicButton
        type='button no-icon outlined'
        mainColor='violet'
        text='Clear Paper'
        onClick={onClear}
      />
      <DynamicButton
        type='button no-icon outlined'
        mainColor='violet'
        text='Reset Examples'
        onClick={onReset}
      />
    </Grid>
  )
}

export default ClearResetButtons
