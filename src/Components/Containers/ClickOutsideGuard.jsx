import { Box } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

function ClickOutsideGuard({
  onEdit,
  children,
  onClickOutside,
  onOutsideHold,
  onSnackbarChange,
  heldDown,
  setHeldDown,
  onDelete,
}) {
  const [onDown, setOnDown] = useState(null)
  const [onDownIsWithin, setOnDownIsWithin] = useState(null)
  const wrapperRef = useRef(null)

  useEffect(() => {
    const handleMouseDown = (e) => {
      if (!onEdit) return
      setOnDown(e.target)
      setOnDownIsWithin(wrapperRef.current.contains(e.target))
    }

    const handleMouseUp = (e) => {
      if (!onEdit) return

      const downOnPaper = Boolean(onDown.closest('.MuiPaper-root'))
      const upOnPaper = Boolean(e.target.closest('.MuiPaper-root'))

      if ((!downOnPaper && !upOnPaper) || !onDownIsWithin) onSnackbarChange()
      if (!downOnPaper || !onDownIsWithin) {
        onClickOutside()
        document.activeElement.blur()
      }
    }

    const handleTouchEnd = (e) => {
      if (!onEdit) return

      const downOnPaper = Boolean(onDown.closest('.MuiPaper-root'))
      const upOnPaper = Boolean(
        e.changedTouches[0].target.closest('.MuiPaper-root')
      )

      if ((!downOnPaper && !upOnPaper) || !onDownIsWithin) onSnackbarChange()
      if (!downOnPaper || !wrapperRef.current.contains(e.target)) {
        onClickOutside()
        document.activeElement.blur()
      }
    }

    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('touchstart', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('touchstart', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [
    onClickOutside,
    onOutsideHold,
    onSnackbarChange,
    onEdit,
    onDown,
    onDownIsWithin,
    heldDown,
    setHeldDown,
    onDelete,
  ])

  const guardStyling = {
    bgcolor: 'primary.opposite',
    webkitTouchCallout: 'none !important',
    webkitUserSelect: 'none !important',
  }

  return (
    <Box sx={guardStyling} ref={wrapperRef}>
      {children}
    </Box>
  )
}
export default ClickOutsideGuard
