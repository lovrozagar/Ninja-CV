import { Button } from '@mui/material'
import ClickOutsideGuard from './ClickOutsideGuard'

function HoverContainer({ children, fn, onEdit }) {
  function handleOutsideClick() {
    fn(false)
  }

  function handleInsideClick(e) {
    fn(true)
  }

  return (
    <ClickOutsideGuard onClickOutside={handleOutsideClick}>
      <Button
        disableRipple
        onClick={handleInsideClick}
        sx={{
          width: '100%',
          p: '0.5rem',
          backgroundImage: `url(
          "data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='black' stroke-width='3' stroke-dasharray='8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e"
        )`,
        }}
      >
        {children}
      </Button>
    </ClickOutsideGuard>
  )
}

export default HoverContainer
