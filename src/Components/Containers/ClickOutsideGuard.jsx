import { useEffect, useRef } from 'react'

function ClickOutsideGuard({ children, onClickOutside }) {
  const wrapperRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onClickOutside()
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
