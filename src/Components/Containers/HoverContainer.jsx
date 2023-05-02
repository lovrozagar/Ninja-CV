import { Button, Snackbar, Alert } from '@mui/material'
import ClickOutsideGuard from './ClickOutsideGuard'
import { useState, useRef, useEffect } from 'react'
import { useLongPress } from 'use-long-press'

function HoverContainer({
  title,
  children,
  onEdit,
  onEditStart,
  onEditEnd,
  onSnackbarChange,
  linkStop,
  onDelete,
  isDragging,
  open,
  close,
  ...props
}) {
  const [heldDown, setHeldDown] = useState(false)
  const [delayed, setDelayed] = useState(false)
  const elementRef = useRef(null)
  let rippleTimeout = null
  let scrollTimeout = null

  // Handle First Ripple delay
  useEffect(() => {
    if (onEdit) {
      rippleTimeout = setTimeout(() => {
        setDelayed(true)
      }, 250)
    }
    if (!onEdit) {
      clearTimeout(rippleTimeout)
      setDelayed(false)
    }
  }, [onEdit])

  // Handle Hold Delete And Cancel
  useEffect(() => {
    function handleHoldOutsideMouseUp(e) {
      if (onEdit) return

      if (
        heldDown &&
        elementRef.current &&
        !elementRef.current.contains(e.target)
      ) {
        setHeldDown(false)
      } else if (heldDown) {
        // Disable pointer events for a millisecond to fix triggering another
        // section's edit mode on touch up when position changes on delete
        document.body.style.pointerEvents = 'none'
        onDelete()
        setTimeout(() => {
          document.body.style.pointerEvents = 'auto'
        }, 1)
      }
    }

    function handleHoldOutsideMouseMove(e) {
      if (onEdit) return

      if (
        heldDown &&
        elementRef.current &&
        !elementRef.current.contains(e.target)
      ) {
        setHeldDown(false)
      }
    }

    function handleTouchMove() {
      if (onEdit) return

      if (heldDown && elementRef.current) {
        setHeldDown(false)
      }
    }

    document.addEventListener('mouseup', handleHoldOutsideMouseUp)
    document.addEventListener('mouseover', handleHoldOutsideMouseMove)
    document.addEventListener('touchmove', handleTouchMove)
    document.addEventListener('touchend', handleHoldOutsideMouseUp)

    return () => {
      document.removeEventListener('mouseup', handleHoldOutsideMouseUp)
      document.removeEventListener('mouseover', handleHoldOutsideMouseMove)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleHoldOutsideMouseUp)
    }
  }, [onEdit, heldDown, onDelete])

  // Stop Scroll On Hold
  useEffect(() => {
    function handleTouchMove(e) {
      if (onEdit) return

      if (heldDown) {
        e.preventDefault()
      }
    }
    document.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      document.removeEventListener('touchmove', handleTouchMove)
    }
  }, [onEdit, heldDown])

  function handleOutsideHold() {
    if (!onEdit && heldDown) {
      setHeldDown(false)
    }
  }

  function handleInsideClick() {
    if (linkStop || !onDelete) return
    if (!onEdit) {
      onEditStart()
      scrollTimeout = setTimeout(() => {
        elementRef.current.scrollIntoView({
          behavior: 'smooth',
        })
      }, 0)
    }
  }

  function handleOutsideClick() {
    if (onEdit) {
      onEditEnd()
      clearTimeout(scrollTimeout)
    }
  }

  function handleContextMenu(e) {
    if (onDelete && !onEdit) e.preventDefault()
  }

  function handleSnackbarClick(e) {
    e.stopPropagation()
    close()
  }

  function onStart(e) {
    if (document.activeElement === e.target) document.activeElement.blur()
  }

  function onCancel() {
    setHeldDown(false)
  }

  const bind = useLongPress(
    () => {
      if (onDelete && !onEdit && !linkStop) setHeldDown(true)
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
    scrollMargin: '100px',
    p: onEdit ? '1.25rem' : '0.5rem 0.75rem',
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
    '@media print': {
      mb:
        title === 'Name' || title === 'Position' || title === 'Links'
          ? '0.25rem'
          : '1rem',
      p: '0',
      backgroundImage: 'none',
    },
  }

  return (
    <ClickOutsideGuard
      onEdit={onEdit}
      onClickOutside={handleOutsideClick}
      onOutsideHold={handleOutsideHold}
      onSnackbarChange={onSnackbarChange}
      heldDown={heldDown}
      setHeldDown={setHeldDown}
      onDelete={onDelete}
    >
      <Button
        {...bind()}
        {...props}
        ref={elementRef}
        component='div'
        onClick={handleInsideClick}
        onContextMenu={handleContextMenu}
        disableRipple={delayed || open || heldDown || linkStop ? true : false}
        sx={styling}
      >
        {children}
        <Snackbar
          open={open}
          autoHideDuration={1000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={close}
          onClick={handleSnackbarClick}
        >
          <Alert
            variant='filled'
            color='violet'
            sx={{ fontWeight: '600', color: 'primary.violet' }}
          >
            {`${title || ''} saved`}
          </Alert>
        </Snackbar>
      </Button>
    </ClickOutsideGuard>
  )
}

export default HoverContainer
