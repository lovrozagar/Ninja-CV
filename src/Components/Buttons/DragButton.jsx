import { DragIndicator } from '@mui/icons-material'
import Flex from '../Containers/Flex'

function DragButton({ onEdit, ...props }) {
  return (
    <Flex {...props} type='center' sx={{ display: onEdit ? 'none' : 'flex' }}>
      <DragIndicator />
    </Flex>
  )
}

export default DragButton
