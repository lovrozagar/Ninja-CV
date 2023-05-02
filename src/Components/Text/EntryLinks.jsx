import { Box, Link, Typography } from '@mui/material'
import Flex from '../Containers/Flex'
import LinkDialog from '../Dialogs/LinkDialog'

function EntryLinks({
  open,
  onOpen,
  onClose,
  onEdit,
  handleLinkClick,
  hyperlink,
  showcaseLink,
  showcasePlaceholder,
  docsLink,
  docsPlaceholder,
}) {
  return (
    <Flex>
      <Box onClick={(e) => handleLinkClick(e, showcaseLink)}>
        <Link
          href={showcaseLink}
          color='inherit'
          underline='hover'
          pointerEvents='hover'
          onClick={(e) => e.preventDefault()}
        >
          <Typography
            fontSize={14}
            fontWeight='300'
            fontStyle='italic'
            sx={{ pointerEvents: 'none' }}
          >
            {showcasePlaceholder}
          </Typography>
        </Link>
      </Box>
      {showcasePlaceholder.trim() !== '' && docsPlaceholder.trim() !== '' && (
        <Typography fontWeight='200'>|</Typography>
      )}
      <Box onClick={(e) => handleLinkClick(e, docsLink)}>
        <Link
          href={docsLink}
          color='inherit'
          underline='hover'
          pointerEvents='hover'
          onClick={(e) => e.preventDefault()}
        >
          <Typography
            fontSize={14}
            fontWeight='300'
            fontStyle='italic'
            pointerEvents='hover'
          >
            {docsPlaceholder}
          </Typography>
        </Link>
      </Box>
      <LinkDialog
        open={open}
        onOpen={onOpen}
        onClose={onClose}
        onEdit={onEdit}
        hyperlink={hyperlink}
      />
    </Flex>
  )
}

export default EntryLinks
