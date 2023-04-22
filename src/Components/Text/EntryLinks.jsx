import { Link, Typography } from '@mui/material'
import Flex from '../Containers/Flex'

function EntryLinks({
  showcaseLink,
  showcasePlaceholder,
  docsLink,
  docsPlaceholder,
}) {
  return (
    <Flex>
      <Link
        href={showcaseLink}
        target='_blank'
        rel='noopener'
        underline='hover'
        color='inherit'
        onClick={(e) => e.stopPropagation()}
      >
        <Typography fontSize={14} fontWeight='300' fontStyle='italic'>
          {showcasePlaceholder}
        </Typography>
      </Link>
      {showcasePlaceholder.trim() !== '' && docsPlaceholder.trim() !== '' && (
        <Typography fontWeight='200'>|</Typography>
      )}
      <Link
        href={docsLink}
        target='_blank'
        rel='noopener'
        underline='hover'
        color='inherit'
        onClick={(e) => e.stopPropagation()}
      >
        <Typography fontSize={14} fontWeight='300' fontStyle='italic'>
          {docsPlaceholder}
        </Typography>
      </Link>
    </Flex>
  )
}

export default EntryLinks
