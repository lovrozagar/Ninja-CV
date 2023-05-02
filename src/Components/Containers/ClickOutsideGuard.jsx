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
    function handleMouseDown(e) {
      if (!onEdit) return
      setOnDown(e.target)
      setOnDownIsWithin(wrapperRef.current.contains(e.target))
    }

    function handleMouseUp(e) {
      if (!onEdit) return

      const clickedInsideSelectMenu = Boolean(e.target.closest('.MuiList-root'))
      const clickedOnSelectMenu = Boolean(
        e.target.classList.contains('MuiBackdrop-root')
      )

      // If clicked dropdown option return
      if (clickedInsideSelectMenu || clickedOnSelectMenu) return

      const downOnPaper = Boolean(onDown.closest('.MuiPaper-root'))
      const upOnPaper = Boolean(e.target.closest('.MuiPaper-root'))

      if ((!downOnPaper && !upOnPaper) || !onDownIsWithin) onSnackbarChange()
      if (!downOnPaper || !onDownIsWithin) {
        onClickOutside()
      }
    }

    async function handleTouchStart(e) {
      await new Promise((resolve) => setTimeout(resolve, 0))
      if (!onEdit) return

      setOnDown(e.targetTouches[0].target)
      setOnDownIsWithin(wrapperRef.current.contains(e.targetTouches[0].target))
    }

    async function handleTouchEnd(e) {
      await new Promise((resolve) => setTimeout(resolve, 0))
      if (!onEdit) return

      const clickedInsideSelectMenu = Boolean(e.target.closest('.MuiList-root'))
      const clickedOnSelectMenu = Boolean(
        e.target.classList.contains('MuiBackdrop-root')
      )

      // If clicked dropdown option return
      if (clickedInsideSelectMenu || clickedOnSelectMenu) return

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
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('touchstart', handleTouchStart)
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchstart', handleTouchStart)
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
