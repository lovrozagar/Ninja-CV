import { Box } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

function ClickOutsideGuard({
  onEdit,
  children,
  onClickOutside,
  onOutsideHold,
  onSnackbarChange,
}) {
  const [onDown, setOnDown] = useState(null)
  const [onDownIsWithin, setOnDownIsWithin] = useState(null)
  const wrapperRef = useRef(null)

  useEffect(() => {
    function handleHoldOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target))
        onOutsideHold()
    }

    const handleMouseDown = (e) => {
      setOnDown(e.target)
      setOnDownIsWithin(wrapperRef.current.contains(e.target))
    }

    const handleMouseUp = (e) => {
      console.log(onDown, e.target)
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

      if (!downOnPaper && !upOnPaper) onSnackbarChange()
      if (!downOnPaper || !wrapperRef.current.contains(e.target)) {
        onClickOutside()
        document.activeElement.blur()
      }
    }

    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('touchstart', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('touchend', handleTouchEnd)
    document.addEventListener('mousemove', handleHoldOutside)
    document.addEventListener('touchmove', handleHoldOutside)

    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('touchstart', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchend', handleTouchEnd)
      document.removeEventListener('mousemove', handleHoldOutside)
      document.removeEventListener('touchmove', handleHoldOutside)
    }
  }, [
    onClickOutside,
    onOutsideHold,
    onSnackbarChange,
    onEdit,
    onDown,
    onDownIsWithin,
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
