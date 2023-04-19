import { Button, IconButton, Typography } from '@mui/material'
import {
  Replay,
  Delete,
  Add,
  HighlightOff,
  RemoveCircleOutlineOutlined,
  Clear,
} from '@mui/icons-material'

function DynamicButton({ type, text, color, onClick, sx }) {
  const [kind, icon, variant] = type ? type.split(' ') : [null, null, null]

  let buttonIcon = null
  switch (icon) {
    case 'restore':
      buttonIcon = <Replay />
      break
    case 'x':
      buttonIcon = <Clear />
      break
    case 'minus':
      buttonIcon = <RemoveCircleOutlineOutlined />
      break
    case 'delete':
      buttonIcon = <Delete />
      break
    case 'remove':
      buttonIcon = <HighlightOff />
      break
    case 'add':
      buttonIcon = <Add />
      break
    default:
      buttonIcon = null
  }

  return (
    <>
      {kind === 'icon' ? (
        <IconButton
          size='small'
          variant={variant || 'text'}
          onClick={onClick}
          sx={{ ...sx, color, textTransform: 'none' }}
        >
          {buttonIcon}
        </IconButton>
      ) : (
        <Button
          size='small'
          variant={variant || 'text'}
          onClick={onClick}
          sx={{ ...sx, color, textTransform: 'none' }}
          endIcon={buttonIcon}
        >
          {text !== null && <Typography fontSize={16}>{text}</Typography>}
        </Button>
      )}
    </>
  )
}

export default DynamicButton
