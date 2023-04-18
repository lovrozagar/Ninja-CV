import { useRef } from 'react'
import { Box, TextField } from '@mui/material'
import Flex from '../Containers/Flex'
import SkewTitle from '../Titles/SkewTitle'
import ResetButton from '../Buttons/ResetButton'
import ClearButton from '../Buttons/ClearButton'
import DeleteButton from '../Buttons/DeleteButton'
import Grid from '../Containers/Grid'

function InputBlock({
  name,
  value,
  type,
  color,
  bgcolor,
  placeholder,
  onClick,
  onChange,
  onClear,
}) {
  const [flow, button] = type ? type.split(' ') : [null, null]

  let component = null
  if (button === 'reset') component = <ResetButton onClick={onClick} />
  else if (button === 'delete') component = <DeleteButton onClick={onClick} />
  else
    component = (
      <Box visibility='hidden'>
        <DeleteButton />
      </Box>
    )

  return (
    <Grid gap={0.5}>
      <Flex
        type={flow}
        sx={{
          width: '99.5%',
          position: 'relative',
          left: 4,
          bgcolor,
          borderRadius: '4px',
          transform: 'skew(-15deg)',
          '& p, & button': { transform: 'skew(15deg)' },
        }}
      >
        <SkewTitle title={name} color={color} bgcolor={bgcolor} />
      </Flex>
      <TextField
        size='small'
        fullWidth
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        gutterBottom
        InputProps={{
          endAdornment: component,
        }}
      />
    </Grid>
  )
}

export default InputBlock
