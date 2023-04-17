import { Typography } from '@mui/material'
import Flex from '../Containers/Flex'

function SkewTitle({ title }) {
  return (
    <Flex>
      <SkewBox>
        <Text title={title} />
      </SkewBox>
    </Flex>
  )
}

function SkewBox({ children }) {
  return (
    <Flex
      sx={{
        width: 'fit-content',
        ml: 1,
        px: 1,
        textAlign: 'left',
        color: 'light.main',
        bgcolor: 'dark.main',
        transform: 'skew(-25deg)',
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
        width: 'fit-content',
        fontWeight: '500',
        transform: 'skew(25deg)',
      }}
    >
      {title}
    </Typography>
  )
}

export default SkewTitle
