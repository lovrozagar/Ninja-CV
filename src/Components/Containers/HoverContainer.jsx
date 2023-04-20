import { Button } from '@mui/material'
import { useState, useRef, useEffect } from 'react'
import { useLongPress } from 'use-long-press'
import ClickOutsideGuard from './ClickOutsideGuard'

function HoverContainer({ children, fn, onEdit, margin, onDelete }) {
  const [heldDown, setHeldDown] = useState(false)
  const [delayed, setDelayed] = useState(false)
  const elementRef = useRef(null)
  let timeout = null

  useEffect(() => {
    if (onEdit) {
      timeout = setTimeout(() => {
        setDelayed(true)
      }, 250)
    }
    if (!onEdit) {
      clearTimeout(timeout)
      setDelayed(false)
    }
  }, [onEdit, fn])

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

  function handleOutsideClick() {
    if (onEdit) {
      fn(false)
    }
  }

  function handleOutsideHold() {
    if (!onEdit && heldDown) {
      setHeldDown(false)
    }
  }

  function handleInsideClick() {
    if (!onEdit) fn(true)
  }

  function handleContextMenu(e) {
    if (onDelete && !onEdit) e.preventDefault()
  }

  function onStart(e) {
    if (document.activeElement === e.target) document.activeElement.blur()
  }

  function onCancel() {
    setHeldDown(false)
  }

  const bind = useLongPress(
    () => {
      if (onDelete && !onEdit) setHeldDown(true)
    },
    {
      onStart,
      onCancel,
      threshold: 500,
    }
  )

  return (
    <ClickOutsideGuard
      onClickOutside={handleOutsideClick}
      onOutsideHold={handleOutsideHold}
    >
      <Button
        {...bind()}
        ref={elementRef}
        component='div'
        onClick={handleInsideClick}
        onContextMenu={handleContextMenu}
        disableRipple={delayed || heldDown ? true : false}
        sx={{
          width: '100%',
          mt: '0.5rem',
          p: onEdit ? 3 : '0.5rem 1rem',
          textTransform: 'none',
          fontWeight: 'normal',
          color: heldDown ? 'light.main' : 'dark.main',
          bgcolor: heldDown ? 'delete.hold' : 'secondary.main',
          backgroundImage: `url(
            "data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23${
              heldDown ? 'ffffff' : 'aaaaaa'
            }' stroke-width='3' stroke-dasharray='8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e"
          )`,
          webkitTouchCallout: 'none !important',
          webkitUserSelect: 'none !important',
          '&:hover': {
            bgcolor: heldDown ? 'delete.hold' : 'secondary.main',
          },
          '&:hover, &:focus-within': {
            backgroundImage: `url(
            "data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23${
              heldDown ? 'b91c1c' : '000000'
            }' stroke-width='3' stroke-dasharray='8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e"
          )`,
          },
          '&:hover h5 + div': {
            boxShadow: heldDown
              ? '0 1px rgba(255, 255, 255, 0.25)'
              : '0 1px rgba(0, 0, 0, 0.25)',
          },
        }}
      >
        {children}
      </Button>
    </ClickOutsideGuard>
  )
}

export default HoverContainer
