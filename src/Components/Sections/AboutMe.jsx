// COMPONENTS
import HoverContainer from '../Containers/HoverContainer'
import Grid from '../Containers/Grid'
import Drag from '../Containers/Drag'
import DragButton from '../Buttons/DragButton'
import SectionTitleView from '../Titles/SectionTitleView'
import InputBlock from '../Inputs/InputBlock'
import InputAreaBlock from '../Inputs/InputAreaBlock'
import Points from '../Text/Points'
import PrimarySecondaryButtons from '../Buttons/PrimarySecondaryButtons'
// FUNCTIONALITY
import { useState, useEffect } from 'react'
import { Draggable } from '@hello-pangea/dnd'
import { getTitleData, getSectionData } from '../../Functions/getSavedData'
import { getAboutMeExample } from '../../Functions/examples'
import { saveDataComplex } from '../../Functions/sectionMethods'
import Placeholders from '../../Functions/placeholders'
import deepCompareValue from '../../Functions/deepCompareValue'
import uniqid from 'uniqid'

function AboutMe({ onDelete, id, index, setSections }) {
  const [onEdit, setOnEdit] = useState(false)
  const [open, setOpen] = useState(false)

  const defaultTitle = 'About Me'
  const [title, setTitle] = useState(() => getTitleData(defaultTitle, id))
  const [titleOld, setTitleOld] = useState(null)

  const example = getAboutMeExample()
  const [aboutMe, setAboutMe] = useState(() => getSectionData(example, id))
  const [aboutMeOld, setAboutMeOld] = useState(null)
  const newAboutMe = {
    text: '',
    id: uniqid(),
  }

  function handleEditStart() {
    setTitleOld(title)
    setAboutMeOld(structuredClone(aboutMe))
    setOnEdit(true)
  }

  function handleEditEnd() {
    setOnEdit(false)
    setTitleOld(null)
    setAboutMeOld(null)
    saveDataComplex({ setter: setSections, id, title, content: aboutMe })
  }

  function handleDonePress() {
    handleEditEnd()
    handleSnackbarChange()
    // disable hanging ripple
    document.activeElement.blur()
  }

  function handleSnackbarChange() {
    if ((!deepCompareValue(aboutMe, aboutMeOld) || title !== titleOld) && !open)
      setOpen(true)
  }

  function handleTitleReset() {
    setTitle(defaultTitle)
  }

  function handleTitleChange(e) {
    setTitle(e.target.value)
  }

  function handleParagraphAdd() {
    setAboutMe((prev) => [...prev, newAboutMe])
  }

  function handleParagraphChange(e, id) {
    setAboutMe((prev) =>
      prev.map((paragraph) => {
        if (paragraph.id !== id) return paragraph

        return { ...paragraph, text: e.target.value }
      })
    )
  }

  function handleParagraphDelete(id) {
    if (aboutMe.length === 1) setAboutMe((prev) => [{ ...prev[0], text: '' }])
    else setAboutMe((prev) => prev.filter((about) => about.id !== id))
  }

  useEffect(() => {
    if (!onEdit) {
      // Remove unnecessary spaces
      setTitle((prev) => prev.trim())
      setAboutMe((prev) =>
        prev
          // Remove unnecessary spaces
          .map((paragraph) => {
            return { ...paragraph, text: paragraph.text }
          })
          // Remove unnecessary spaces
          .filter((paragraph) => paragraph.text !== '')
      )
    }
  }, [onEdit])

  return (
    <Draggable draggableId={id} index={index} direction='vertical'>
      {(provided, snapshot) => {
        return (
          <Drag onEdit={onEdit} provided={provided}>
            <DragButton
              onEdit={onEdit}
              isDragging={snapshot.isDragging}
              {...provided.dragHandleProps}
            />
            <HoverContainer
              title={title}
              onEdit={onEdit}
              onEditStart={handleEditStart}
              onEditEnd={handleEditEnd}
              onDelete={onDelete}
              onSnackbarChange={handleSnackbarChange}
              isDragging={snapshot.isDragging}
              open={open}
              close={() => setOpen(false)}
            >
              <Grid>
                {onEdit ? (
                  <AboutMeEdit
                    title={title}
                    onTitleChange={handleTitleChange}
                    onTitleReset={handleTitleReset}
                    aboutMe={aboutMe}
                    onParagraphAdd={handleParagraphAdd}
                    onParagraphChange={handleParagraphChange}
                    onParagraphDelete={handleParagraphDelete}
                    onDonePress={handleDonePress}
                  />
                ) : (
                  <AboutMeView title={title} aboutMe={aboutMe} />
                )}
              </Grid>
            </HoverContainer>
          </Drag>
        )
      }}
    </Draggable>
  )
}

function AboutMeEdit({
  title,
  onTitleChange,
  onTitleReset,
  aboutMe,
  onParagraphAdd,
  onParagraphChange,
  onParagraphDelete,
  onDonePress,
}) {
  return (
    <Grid gap={1.5}>
      <InputBlock
        name='Section Title'
        button='restore'
        value={title}
        color='primary.opposite'
        bgcolor='primary.main'
        onChange={onTitleChange}
        onClick={onTitleReset}
      />
      <Grid>
        {aboutMe.map((paragraph, index) => {
          return (
            <InputAreaBlock
              key={index}
              color='primary.opposite'
              bgcolor='primary.violet'
              name={`${index + 1}. Paragraph`}
              placeholder={Placeholders.getAboutParagraph(index)}
              value={paragraph.text}
              onChange={(e) => onParagraphChange(e, paragraph.id)}
              onDelete={() => onParagraphDelete(paragraph.id)}
            />
          )
        })}
      </Grid>
      <PrimarySecondaryButtons
        primaryText='Done'
        secondaryText='Add Skill'
        onAdd={onParagraphAdd}
        onDone={onDonePress}
      />
    </Grid>
  )
}

function AboutMeView({ title, aboutMe }) {
  return (
    <Grid gap={0}>
      <SectionTitleView title={title || 'About Me'} />
      <Grid gap={0} marginTop={0.85} pl={1}>
        <Points array={aboutMe} noBullet />
      </Grid>
    </Grid>
  )
}

export default AboutMe
