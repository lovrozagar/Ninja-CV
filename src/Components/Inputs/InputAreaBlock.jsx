import { TextField } from '@mui/material'
import Flex from '../Containers/Flex'
import SkewTitle from '../Titles/SkewTitle'
import DeleteButton from '../Buttons/DeleteButton'
import Grid from '../Containers/Grid'

function InputAreaBlock({
  value,
  placeholder,
  name,
  color,
  bgcolor,
  onChange,
}) {
  return (
    <Grid gap={0.35}>
      <Flex
        type='between'
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
        fullWidth
        size='small'
        value={value}
        placeholder={placeholder}
        multiline
        maxRows={4}
        onChange={onChange}
        InputProps={{
          endAdornment: (
            <>
              <DeleteButton color='#666' />
            </>
          ),
        }}
      />
    </Grid>
  )
}

export default InputAreaBlock
