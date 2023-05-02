import React from 'react'
import Flex from '../Containers/Flex'
import DynamicButton from './DynamicButton'

function PrimarySecondaryButtons({
  primaryText,
  secondaryText,
  onAdd,
  onDone,
}) {
  return (
    <Flex type='end'>
      <DynamicButton
        mainColor='violet'
        type='button add contained medium'
        text={secondaryText}
        onClick={onAdd}
      />
      <DynamicButton
        mainColor='black'
        type='button done contained medium'
        text={primaryText}
        onClick={onDone}
      />
    </Flex>
  )
}

export default PrimarySecondaryButtons
