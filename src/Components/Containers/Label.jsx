import { Box } from '@mui/material'

function Label({ children, htmlFor }) {
  return (
    <Box
      component='label'
      htmlFor={htmlFor}
      onClick={(e) => {
        e.stopPropagation()
        console.log(e.target)
      }}
    >
      {children}
    </Box>
  )
}

export default Label
