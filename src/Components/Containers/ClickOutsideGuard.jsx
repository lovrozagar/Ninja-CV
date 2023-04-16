import { Box } from '@mui/material'
import { useEffect, useRef } from 'react'

function ClickOutsideGuard({ children, onClickOutside }) {
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

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [onClickOutside])

  return <Box ref={wrapperRef}>{children}</Box>
}
export default ClickOutsideGuard
