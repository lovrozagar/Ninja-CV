import { useRef } from 'react'
import { TextField } from '@mui/material'
import Grid from '../Containers/Grid'
import SkewTitle from '../Titles/SkewTitle'
import DynamicButton from '../Buttons/DynamicButton'
import uniqid from 'uniqid'

function InputBlock({
  name,
  value,
  button,
  color,
  bgcolor,
  placeholder,
  onChange,
  onClick,
}) {
  const connectFocus = useRef(uniqid())

  const endButton = button ? (
    <DynamicButton
      mainColor='black'
      type={`icon ${button || null}`}
      onClick={onClick}
    />
  ) : null

  return (
    <Grid gap={0.5}>
      <SkewTitle
        htmlFor={connectFocus.current}
        title={name}
        color={color}
        bgcolor={bgcolor}
      />
      <TextField
        id={connectFocus.current}
        size='small'
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        InputProps={{
          endAdornment: endButton,
        }}
      />
    </Grid>
  )
}

export default InputBlock
