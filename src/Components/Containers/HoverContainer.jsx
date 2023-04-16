import { Button } from '@mui/material'
import { useState, useRef } from 'react'
import ClickOutsideGuard from './ClickOutsideGuard'

function HoverContainer({ children, fn, onEdit, margin, onDelete }) {
  const [heldDown, setHeldDown] = useState(false)
  const buttonRef = useRef(null)
  const touchRef = useRef(null)
  const touchRippleProps = {
    timeout: 1000,
  }
  let timeoutId = null

  function handleOutsideClick() {
    if (onEdit) fn(false)
  }

  function handleInsideClick() {
    if (!onEdit) fn(true)
  }

  function handleMouseDown(e) {
    // SYNC MUI RIPPLE WHEN ELEMENT IN FOCUS
    e.stopPropagation()
    if (document.activeElement === e.target) document.activeElement.blur()
    // CHECK IF COMPONENT IS DELETABLE
    if (onDelete) {
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
    if (onDelete && !onEdit) {
      if (heldDown) onDelete()

      setHeldDown(false)
      clearTimeout(timeoutId)
    }
  }

  function handleMouseLeave() {
    if (onDelete && !onEdit) {
      setHeldDown(false)
      clearTimeout(timeoutId)
    }
  }

  function handleTouchStart(e) {
    // SYNC MUI RIPPLE WHEN ELEMENT IN FOCUS
    e.stopPropagation()
    if (document.activeElement === e.target) document.activeElement.blur()
    // CHECK IF COMPONENT IS DELETABLE
    if (onDelete) {
      // DELETE TIMEOUT
      if (!onEdit) {
        setHeldDown(false)
        timeoutId = setTimeout(() => {
          setHeldDown(true)
          touchRef.current = e.touches[0].identifier
        }, 800)
      }
    }
  }

  function handleTouchMove(e) {
    if (onDelete) {
      const touch = Array.from(e.touches).find(
        (touch) => touch.identifier === touchRef.current
      )
      if (!touch || !buttonRef.current.contains(touch.target)) {
        setHeldDown(false)
      }
    }
  }

  function handleTouchEnd() {
    if (onDelete && !onEdit) {
      if (heldDown) onDelete()

      touchRef.current = null
      setHeldDown(false)
      clearTimeout(timeoutId)
    }
  }

  function handleContextMenu(e) {
    if (onDelete && !onEdit) e.preventDefault()
  }

  return (
    <ClickOutsideGuard onClickOutside={handleOutsideClick}>
      <Button
        component='div'
        ref={buttonRef}
        onClick={handleInsideClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onContextMenu={handleContextMenu}
        TouchRippleProps={touchRippleProps}
        disableRipple={onEdit || heldDown ? true : false}
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
