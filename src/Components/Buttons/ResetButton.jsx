import { Button } from '@mui/material'
import { Replay } from '@mui/icons-material'

function ResetButton({ onClick }) {
  return (
    <Button onClick={onClick}>
      <Replay />
    </Button>
  )
}

export default ResetButton
