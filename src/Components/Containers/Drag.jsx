import Grid from './Grid'

function Drag({ children, onEdit, provided }) {
  const styling = {
    paddingLeft: onEdit ? '0.45rem' : '0',
    '@media print': {
      gridTemplateColumns: '1fr',
    },
  }

  return (
    <div {...provided.draggableProps} ref={provided.innerRef}>
      <Grid type={onEdit ? '1fr' : 'auto 1fr'} gap='0.05rem' sx={styling}>
        {children}
      </Grid>
    </div>
  )
}

export default Drag
