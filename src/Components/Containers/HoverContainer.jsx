import { Button } from '@mui/material'
import ClickOutsideGuard from './ClickOutsideGuard'

function HoverContainer({ children, fn, onEdit }) {
  function handleOutsideClick(e) {
    fn(false)
  }

  function handleInsideClick(e) {
    !onEdit && fn(true)
  }

  return (
    <ClickOutsideGuard onClickOutside={handleOutsideClick}>
      <Button
        component='div'
        disableRipple={onEdit ? true : false}
        onClick={handleInsideClick}
        sx={{
          width: '100%',
          mt: '0.5rem',
          p: '0.5rem',
          textTransform: 'none',
          fontWeight: 'normal',
          backgroundImage: `url(
          "data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23AAA' stroke-width='3' stroke-dasharray='8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e"
        )`,
          '&:hover, &:focus-within': {
            backgroundImage: `url(
          "data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23000' stroke-width='3' stroke-dasharray='8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e"
        )`,
          },
        }}
      >
        {children}
      </Button>
    </ClickOutsideGuard>
  )
}

export default HoverContainer
