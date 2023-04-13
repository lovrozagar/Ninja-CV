import { useEffect, useRef } from 'react'

function ClickOutsideGuard({ children, onClickOutside }) {
  const wrapperRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      const clickedInsideSelectMenu = Boolean(
        event.target.closest('.MuiList-root')
      )

      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target) &&
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

  return <div ref={wrapperRef}>{children}</div>
}

export default ClickOutsideGuard
