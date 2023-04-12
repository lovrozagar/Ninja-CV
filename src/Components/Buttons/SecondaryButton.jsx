import { Button } from '@mui/material'

function SecondaryButton({ children, onClick }) {
  return (
    <Button
      variant='outlined'
      onClick={onClick}
      sx={{
        color: 'secondary.main',
      }}
    >
      {children}
    </Button>
  )
}

export default SecondaryButton
