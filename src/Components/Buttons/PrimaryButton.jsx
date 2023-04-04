import { Button } from '@mui/material'

function PrimaryButton({ children, handleClick }) {
  return (
    <Button
      variant='filled'
      onClick={handleClick}
      sx={{
        backgroundColor: 'primary.main',
        color: 'primary.text',
        '&:hover': { backgroundColor: 'primary.mainHover' },
      }}
    >
      {children}
    </Button>
  )
}

export default PrimaryButton
