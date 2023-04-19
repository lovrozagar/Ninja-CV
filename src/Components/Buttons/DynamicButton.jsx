import { Button, IconButton, Typography } from '@mui/material'
import {
  Replay,
  Add,
  Done,
  HighlightOff,
  RemoveCircleOutlineOutlined,
  Clear,
} from '@mui/icons-material'
import Flex from '../Containers/Flex'

function DynamicButton({ type, text, color, onClick, sx }) {
  const [kind, icon, variant, size] = type
    ? type.split(' ')
    : [null, null, null, null]

  let buttonIcon = null
  switch (icon) {
    case 'restore':
      buttonIcon = <Replay sx={{ fontSize: '1.25rem' }} />
      break
    case 'x':
      buttonIcon = <Clear sx={{ fontSize: '1.25rem' }} />
      break
    case 'minus':
      buttonIcon = <RemoveCircleOutlineOutlined sx={{ fontSize: '1.25rem' }} />
      break
    case 'delete':
      buttonIcon = <RemoveCircleOutlineOutlined sx={{ fontSize: '1.25rem' }} />
      break
    case 'remove':
      buttonIcon = <HighlightOff sx={{ fontSize: '1.25rem' }} />
      break
    case 'add':
      buttonIcon = <Add sx={{ fontSize: '1.25rem' }} />
      break
    case 'done':
      buttonIcon = <Done sx={{ fontSize: '1.25rem' }} />
      break
    default:
      buttonIcon = null
  }

  return (
    <>
      {kind === 'icon' ? (
        <IconButton
          size={size || 'small'}
          variant={variant || 'text'}
          onClick={onClick}
          sx={{ ...sx, color: color || 'primary.main', textTransform: 'none' }}
        >
          {buttonIcon}
        </IconButton>
      ) : (
        <Button
          size={size || 'small'}
          variant={variant || 'text'}
          onClick={onClick}
          sx={{ ...sx, color: color || 'primary.main', textTransform: 'none' }}
        >
          <Flex type='center'>
            {text}
            {buttonIcon}
          </Flex>
        </Button>
      )}
    </>
  )
}

export default DynamicButton
