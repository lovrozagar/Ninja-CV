// COMPONENTS
import { Typography } from '@mui/material'
import HoverContainer from '../Containers/HoverContainer'
import Grid from '../Containers/Grid'
import Drag from '../Containers/Drag'
import DragButton from '../Buttons/DragButton'
import SectionTitleView from '../Titles/SectionTitleView'
import InputBlock from '../Inputs/InputBlock'
import InputAreaBlock from '../Inputs/InputAreaBlock'
import PrimarySecondaryButtons from '../Buttons/PrimarySecondaryButtons'
// FUNCTIONALITY
import { useState, useEffect } from 'react'
import { Draggable } from '@hello-pangea/dnd'
import Placeholders from '../../Functions/placeholders'
import uniqid from 'uniqid'

function AboutMe({ onDelete, id, index }) {
  const [onEdit, setOnEdit] = useState(false)
  const defaultTitle = 'About Me'
  const defaultAboutMe = [
    {
      text: 'As a web developer, I am passionate about creating engaging and user-friendly websites that meet the needs of businesses and their customers.',
      id: uniqid(),
    },
    {
      text: 'With a strong background in web development, I am proficient in coding, testing, and deploying websites across multiple platforms.',
      id: uniqid(),
    },
  ]
  const [title, setTitle] = useState(defaultTitle)
  const [aboutMe, setAboutMe] = useState(defaultAboutMe)
  const newAboutMe = {
    text: '',
    id: uniqid(),
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

  function handleDone() {
    setOnEdit(false)
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
              onEdit={onEdit}
              fn={setOnEdit}
              onDelete={onDelete}
              isDragging={snapshot.isDragging}
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
                    onDone={handleDone}
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
  onDone,
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
        onDone={onDone}
      />
    </Grid>
  )
}

function AboutMeView({ title, aboutMe }) {
  return (
    <Grid gap={0}>
      <SectionTitleView title={title || 'About Me'} />
      <Grid>
        {aboutMe.map((paragraph, index) => {
          return (
            <Typography key={index} pl={1.5} fontSize={13} textAlign='left'>
              {paragraph.text}
            </Typography>
          )
        })}
      </Grid>
    </Grid>
  )
}

export default AboutMe
