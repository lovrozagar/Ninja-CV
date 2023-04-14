import { Button } from '@mui/material'
import { DeleteOutline } from '@mui/icons-material'

function DeleteButton({ handleClick }) {
  return (
    <Button onClick={handleClick}>
      <DeleteOutline />
    </Button>
  )
}

export default DeleteButton
