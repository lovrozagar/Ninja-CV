import { Button } from '@mui/material'

function SecondaryButton({ children, handleClick }) {
  return (
    <Button
      variant='outlined'
      onClick={handleClick}
      sx={{
        color: 'secondary.main',
      }}
    >
      {children}
    </Button>
  )
}

export default SecondaryButton
