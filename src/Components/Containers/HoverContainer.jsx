import { Button } from '@mui/material'
import { useState, useRef, useEffect, useCallback } from 'react'
import { useLongPress } from 'use-long-press'
import ClickOutsideGuard from './ClickOutsideGuard'

function HoverContainer({ children, fn, onEdit, margin, onDelete }) {
  const [heldDown, setHeldDown] = useState(false)
  const [isOutOfBounds, setIsOutOfBounds] = useState(false)
  const elementRef = useRef(null)

  function handleOutsideClick() {
    if (onEdit) {
      fn(false)
    }
    if (!onEdit && heldDown) {
      setHeldDown(false)
    }
  }

  function handleInsideClick(e) {
    if (!onEdit) fn(true)
  }

  function handleContextMenu(e) {
    if (onDelete && !onEdit) e.preventDefault()
  }

  function onStart(e) {
    if (document.activeElement === e.target) document.activeElement.blur()
  }

  function onFinish() {
    if (isOutOfBounds) return
    if (onDelete && heldDown) {
      onDelete()
      setIsOutOfBounds(false)
    }
  }

  function onCancel(e) {
    setHeldDown(false)
  }

  const bind = useLongPress(
    () => {
      setHeldDown(true)
    },
    {
      onStart,
      onCancel,
    }
  )

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        heldDown &&
        elementRef.current &&
        !elementRef.current.contains(event.target)
      ) {
        setHeldDown(false)
      } else if (heldDown) {
        onDelete()
      }
    }

    document.addEventListener('mouseup', handleClickOutside)

    return () => {
      document.removeEventListener('mouseup', handleClickOutside)
    }
  }, [heldDown, onDelete])

  return (
    <ClickOutsideGuard onClickOutside={handleOutsideClick}>
      <Button
        {...bind()}
        ref={elementRef}
        component='div'
        onClick={handleInsideClick}
        onContextMenu={handleContextMenu}
        disableRipple={onEdit || heldDown ? true : false}
        sx={{
          width: '100%',
          mt: '0.5rem',
          p: margin === 'wide' ? '0.5rem 1rem' : '0.5rem',
          textTransform: 'none',
          fontWeight: 'normal',
          bgcolor: heldDown ? 'delete.hold' : 'secondary.main',
          backgroundImage: `url(
          "data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23AAA' stroke-width='3' stroke-dasharray='8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e"
        )`,
          '&:hover': {
            bgcolor: heldDown ? 'delete.hold' : 'secondary.main',
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
