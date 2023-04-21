import Flex from '../Containers/Flex'
import SkewTitle from './SkewTitle'
import DynamicButton from '../Buttons/DynamicButton'

function IndexDeleteTitle({ title, onDelete }) {
  return (
    <Flex type='between'>
      <SkewTitle
        title={title}
        color='primary.opposite'
        bgcolor='primary.darkGrey'
      />
      <DynamicButton
        mainColor='black'
        type='button delete'
        text='Remove'
        onClick={onDelete}
      />
    </Flex>
  )
}

export default IndexDeleteTitle
