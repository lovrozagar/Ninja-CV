import { TextField } from '@mui/material'
import Flex from '../Containers/Flex'
import Grid from '../Containers/Grid'
import SkewTitle from '../Titles/SkewTitle'
import DynamicButton from '../Buttons/DynamicButton'

function InputBlock({
  name,
  value,
  button,
  htmlFor,
  color,
  bgcolor,
  placeholder,
  onChange,
  onClick,
}) {
  return (
    <Grid gap={0.5}>
      <SkewTitle
        title={name}
        htmlFor={htmlFor}
        color={color}
        bgcolor={bgcolor}
      />
      <TextField
        id={htmlFor}
        size='small'
        fullWidth
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        InputProps={{
          endAdornment: (
            <DynamicButton
              mainColor='black'
              type={`icon ${button || null}`}
              onClick={onClick}
            />
          ),
        }}
      />
    </Grid>
  )
}

export default InputBlock
