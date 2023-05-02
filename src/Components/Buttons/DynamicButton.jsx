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
  GitHub,
  Info,
} from '@mui/icons-material'
import Flex from '../Containers/Flex'
import shuriken from '../../Assets/images/shuriken.svg'

function DynamicButton({ type, text, mainColor, onClick, gap, reverse, sx }) {
  // THEME
  const theme = useTheme()

  const { palette } = createTheme()
  const { augmentColor } = palette
  const createColor = (mainColor) =>
    augmentColor({ color: { main: mainColor } })
  const buttonTheme = createTheme({
    palette: {
      black: createColor(theme.palette.primary.darkGrey),
      grey: createColor(theme.palette.primary.mediumGrey),
      violet: createColor(theme.palette.primary.violet),
    },
  })

  const customStyle = {
    ...sx,
    textTransform: 'none',
  }
  const iconStyle = { fontSize: '1.25rem' }

  // PreloadShuriken
  const shurikenImg = new Image()
  shurikenImg.src = shuriken

  const [kind, icon, variant, size] = type
    ? type.split(' ')
    : [null, null, null, null]

  let buttonIcon = null
  switch (icon) {
    case 'restore':
      buttonIcon = <Replay sx={iconStyle} />
      break
    case 'x':
      buttonIcon = <Clear sx={iconStyle} />
      break
    case 'minus':
      buttonIcon = <RemoveCircleOutlineOutlined sx={iconStyle} />
      break
    case 'delete':
      buttonIcon = <RemoveCircleOutlineOutlined sx={iconStyle} />
      break
    case 'remove':
      buttonIcon = <HighlightOff sx={iconStyle} />
      break
    case 'add':
      buttonIcon = <Add sx={iconStyle} />
      break
    case 'done':
      buttonIcon = <Done sx={iconStyle} />
      break
    case 'github':
      buttonIcon = <GitHub sx={iconStyle} />
      break
    case 'info':
      buttonIcon = <Info sx={iconStyle} />
      break
    case 'shuriken':
      buttonIcon = (
        <img
          src={shurikenImg.src}
          alt='shuriken Logo'
          style={{ transform: 'rotate(20deg)', minWidth: '1.25rem' }}
        />
      )
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
          {reverse && reverse !== 0 ? (
            <Flex type='center' gap={gap || 1}>
              {buttonIcon}
              {text}
            </Flex>
          ) : (
            <Flex type='center' gap={gap || 1}>
              {text}
              {buttonIcon}
            </Flex>
          )}
        </Button>
      )}
    </ThemeProvider>
  )
}

export default DynamicButton
