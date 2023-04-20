import { Box } from '@mui/material'
import { useEffect, useRef } from 'react'

function ClickOutsideGuard({ children, onClickOutside, onOutsideHold }) {
  const wrapperRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      const clickedInsideSelectMenu = Boolean(e.target.closest('.MuiList-root'))
      const clickedOnSelectMenu = Boolean(
        e.target.classList.contains('MuiBackdrop-root')
      )

      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target) &&
        !clickedOnSelectMenu &&
        !clickedInsideSelectMenu
      ) {
        onClickOutside()
        document.activeElement.blur()
      }
    }

    function handleHoldOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target))
        onOutsideHold()
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    document.addEventListener('mousemove', handleHoldOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
      document.addEventListener('mousemove', handleHoldOutside)
    }
  }, [onClickOutside, onOutsideHold])

  return (
    <Box
      sx={{
        webkitTouchCallout: 'none !important',
        webkitUserSelect: 'none !important',
      }}
      ref={wrapperRef}
    >
      {children}
    </Box>
  )
}
export default ClickOutsideGuard
