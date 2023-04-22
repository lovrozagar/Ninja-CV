import { useRef } from 'react'
import { TextField } from '@mui/material'
import Grid from '../Containers/Grid'
import SkewTitle from '../Titles/SkewTitle'
import DynamicButton from '../Buttons/DynamicButton'
import uniqid from 'uniqid'

function InputAreaBlock({
  value,
  placeholder,
  name,
  color,
  bgcolor,
  onChange,
  onDelete,
}) {
  const connectFocus = useRef(uniqid())

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
        placeholder={placeholder}
        multiline
        maxRows={4}
        onChange={onChange}
        InputProps={{
          endAdornment: (
            <DynamicButton mainColor='black' type='icon x' onClick={onDelete} />
          ),
        }}
      />
    </Grid>
  )
}

export default InputAreaBlock
