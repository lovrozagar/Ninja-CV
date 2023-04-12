import { Button } from '@mui/material'

function PrimaryButton({ children, onClick }) {
  return (
    <Button
      variant='filled'
      onClick={onClick}
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
