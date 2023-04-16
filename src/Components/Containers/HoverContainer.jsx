import { Button } from '@mui/material'
import { useState, useRef, useEffect } from 'react'
import ClickOutsideGuard from './ClickOutsideGuard'

function HoverContainer({ children, fn, onEdit, margin, onDelete }) {
  const [heldDown, setHeldDown] = useState(false)
  const buttonRef = useRef(null)
  let timeoutId = null

  function handleOutsideClick() {
    fn(false)
  }

  function handleInsideClick() {
    !onEdit && fn(true)
  }

  function handleMouseDown(e) {
    // CHECK IF COMPONENT IS DELETABLE
    if (onDelete) {
      // SYNC MUI RIPPLE WHEN ELEMENT IN FOCUS
      e.stopPropagation()
      if (document.activeElement === e.target) document.activeElement.blur()
      // DELETE TIMEOUT
      if (!onEdit) {
        setHeldDown(false)
        timeoutId = setTimeout(() => {
          setHeldDown(true)
        }, 800)
      }
    }
  }

  function handleMouseUp() {
    if (onDelete) {
      if (!onEdit && heldDown) {
        onDelete && onDelete()
      }
      if (!onEdit) {
        setHeldDown(false)
        clearTimeout(timeoutId)
      }
    }
  }

  function handleMouseLeave() {
    if (onDelete && !onEdit) {
      setHeldDown(false)
      clearTimeout(timeoutId)
    }
  }

  return (
    <ClickOutsideGuard onClickOutside={handleOutsideClick}>
      <Button
        ref={buttonRef}
        disableRipple={onEdit ? true : false}
        component='div'
        onClick={handleInsideClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        sx={{
          width: '100%',
          mt: '0.5rem',
          p: margin === 'wide' ? '0.5rem 1rem' : '0.5rem',
          textTransform: 'none',
          fontWeight: 'normal',
          bgcolor: heldDown ? 'delete.hold' : 'white',
          backgroundImage: `url(
          "data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23AAA' stroke-width='3' stroke-dasharray='8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e"
        )`,
          '&:hover': {
            bgcolor: heldDown ? 'delete.hold' : 'white',
          },
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
