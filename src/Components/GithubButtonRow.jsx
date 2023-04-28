import { Link } from '@mui/material'
import Flex from './Containers/Flex'
import DynamicButton from './Buttons/DynamicButton'

function GithubButtonRow() {
  return (
    <Flex type='center' mb={2}>
      <Link
        href='https://github.com/lovrozagar'
        target='_blank'
        rel='noopener'
        underline='none'
        color='inherit'
      >
        <DynamicButton
          type='button github'
          text='GitHub'
          mainColor='grey'
          sx={{ fontWeight: 600 }}
        />
      </Link>
    </Flex>
  )
}

export default GithubButtonRow
