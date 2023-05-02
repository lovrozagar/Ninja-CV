import { DragIndicator } from '@mui/icons-material'
import Flex from '../Containers/Flex'

function DragButton({ onEdit, isDragging, ...props }) {
  const styling = {
    display: onEdit ? 'none' : 'flex',
    color: isDragging ? 'primary.transparentViolet' : 'primary.mediumGrey',
    '@media print': {
      display: 'none',
    },
  }

  return (
    <Flex {...props} type='center' sx={styling}>
      <DragIndicator />
    </Flex>
  )
}

export default DragButton
