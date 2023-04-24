import Grid from './Grid'

function Drag({ children, onEdit, provided }) {
  return (
    <div {...provided.draggableProps} ref={provided.innerRef}>
      <Grid type={onEdit ? '1fr' : 'auto 1fr'}>{children}</Grid>
    </div>
  )
}

export default Drag
