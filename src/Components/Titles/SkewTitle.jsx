import { Typography } from '@mui/material'
import Flex from '../Containers/Flex'
import Label from '../Containers/Label'

function SkewTitle({ title, htmlFor, color, bgcolor }) {
  return (
    <Label htmlFor={htmlFor}>
      <Flex
        sx={{
          position: 'relative',
          left: 2,
          bgcolor,
          borderRadius: '4px',
          transform: 'skew(-15deg)',
          pointerEvents: 'none',
          '& p': { transform: 'skew(15deg)' },
        }}
      >
        <SkewBox color={color} bgcolor={bgcolor}>
          <Text title={title} />
        </SkewBox>
      </Flex>
    </Label>
  )
}

function SkewBox({ children, color, bgcolor }) {
  return (
    <Flex
      sx={{
        px: 1,
        mx: 0.25,
        textAlign: 'left',
        color,
        bgcolor,
      }}
    >
      {children}
    </Flex>
  )
}

function Text({ title }) {
  return (
    <Typography
      sx={{
        fontWeight: '500',
      }}
    >
      {title}
    </Typography>
  )
}

export default SkewTitle
