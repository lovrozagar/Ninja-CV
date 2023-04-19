import {
  Button,
  IconButton,
  useTheme,
  createTheme,
  ThemeProvider,
} from '@mui/material'
import {
  Replay,
  Add,
  Done,
  HighlightOff,
  RemoveCircleOutlineOutlined,
  Clear,
} from '@mui/icons-material'
import Flex from '../Containers/Flex'

function DynamicButton({ type, text, mainColor, onClick, sx }) {
  // THEME
  const theme = useTheme()

  const { palette } = createTheme()
  const { augmentColor } = palette
  const createColor = (mainColor) =>
    augmentColor({ color: { main: mainColor } })
  const buttonTheme = createTheme({
    palette: {
      black: createColor(theme.palette.primary.darkGrey),
      violet: createColor(theme.palette.primary.violet),
    },
  })

  const customStyle = {
    ...sx,
    textTransform: 'none',
  }

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
    <ThemeProvider theme={buttonTheme}>
      {kind === 'icon' ? (
        <IconButton
          size={size || 'small'}
          variant={variant || 'text'}
          onClick={onClick}
          color={mainColor}
          sx={customStyle}
        >
          {buttonIcon}
        </IconButton>
      ) : (
        <Button
          size={size || 'small'}
          variant={variant || 'text'}
          onClick={onClick}
          color={mainColor}
          sx={customStyle}
        >
          <Flex type='center'>
            {text}
            {buttonIcon}
          </Flex>
        </Button>
      )}
    </ThemeProvider>
  )
}

export default DynamicButton
