import { Button } from '@mui/material'
import { useState, useRef, useEffect } from 'react'
import { useLongPress } from 'use-long-press'
import ClickOutsideGuard from './ClickOutsideGuard'

function HoverContainer({ children, fn, onEdit, onDelete, isDragging }) {
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
    document.addEventListener('touchend', handleClickOutside)

    return () => {
      document.removeEventListener('mouseup', handleClickOutside)
      document.removeEventListener('touchend', handleClickOutside)
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

  const svgColors = {
    white: '%23ffffff',
    darkGrey: '%23333333',
    mediumGrey: '%23bbbbbb',
    holdRed: '%23b91c1c',
    violet: '%237d8af8',
  }

  const styling = {
    width: '100%',
    mb: 1,
    p: onEdit ? 3 : '0.5rem',
    textTransform: 'none',
    fontWeight: 'normal',
    color: heldDown ? 'primary.opposite' : 'primary.main',
    bgcolor: heldDown
      ? 'primary.holdRed'
      : isDragging
      ? 'primary.transparentViolet'
      : 'primary.opposite',
    backgroundImage: `url(
            "data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='${
              heldDown
                ? svgColors.holdRed
                : isDragging
                ? svgColors.violet
                : svgColors.mediumGrey
            }' stroke-width='3' stroke-dasharray='8' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e"
          )`,
    webkitTouchCallout: 'none !important',
    webkitUserSelect: 'none !important',
    '&:hover': {
      bgcolor: heldDown
        ? 'primary.holdRed'
        : onEdit
        ? 'primary.opposite'
        : null,
    },
    '&:hover, &:focus-within': {
      backgroundImage: `url(
            "data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='${
              heldDown ? svgColors.holdRed : svgColors.mediumGrey
            }' stroke-width='3' stroke-dasharray='8' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e"
          )`,
    },
    '&:hover h5 + div': {
      boxShadow: heldDown
        ? '0 1px primary.transparentMain'
        : '0 1px primary.transparentGrey',
    },
  }

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
        sx={styling}
      >
        {children}
      </Button>
    </ClickOutsideGuard>
  )
}

export default HoverContainer
