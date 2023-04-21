import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import HoverContainer from '../Containers/HoverContainer'
import Grid from '../Containers/Grid'
import SectionTitleView from '../Titles/SectionTitleView'
import InputBlock from '../Inputs/InputBlock'
import InputAreaBlock from '../Inputs/InputAreaBlock'
import uniqid from 'uniqid'

function AboutMe({ onDelete }) {
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
  const [onEdit, setOnEdit] = useState(false)
  const [title, setTitle] = useState(defaultTitle)
  const [aboutMe, setAboutMe] = useState(defaultAboutMe)

  function handleTitleReset() {
    setTitle(defaultTitle)
  }

  function handleTitleChange(e) {
    setTitle(e.target.value)
  }

  function handleParagraphChange(e, id) {
    setAboutMe((prev) =>
      prev.map((paragraph) => {
        if (paragraph.id !== id) return paragraph

        return { ...paragraph, text: e.target.value }
      })
    )
  }

  return (
    <HoverContainer onEdit={onEdit} fn={setOnEdit} onDelete={onDelete}>
      <Grid>
        {onEdit ? (
          <AboutMeEdit
            title={title}
            aboutMe={aboutMe}
            onTitleReset={handleTitleReset}
            onTitleChange={handleTitleChange}
            onParagraphChange={handleParagraphChange}
          />
        ) : (
          <AboutMeView title={title} aboutMe={aboutMe} />
        )}
      </Grid>
    </HoverContainer>
  )
}

function AboutMeEdit({
  title,
  aboutMe,
  onTitleReset,
  onTitleChange,
  onParagraphChange,
}) {
  return (
    <Grid>
      <InputBlock
        name='Section Title'
        button='restore'
        value={title}
        color='primary.opposite'
        bgcolor='primary.main'
        onChange={onTitleChange}
        onClick={onTitleReset}
      />
      {aboutMe.map((paragraph, index) => {
        return (
          <InputAreaBlock
            key={index}
            color='primary.opposite'
            bgcolor='primary.violet'
            name={`${index + 1}. Paragraph`}
            value={paragraph.text}
            onChange={(e) => onParagraphChange(e, paragraph.id)}
          />
        )
      })}
    </Grid>
  )
}

function AboutMeView({ title, aboutMe }) {
  return (
    <Grid gap={0}>
      <SectionTitleView title={title} />
      <Grid>
        {aboutMe.map((paragraph) => {
          return (
            <Typography pl={1.5} fontSize={13} textAlign='left'>
              {paragraph.text}
            </Typography>
          )
        })}
      </Grid>
    </Grid>
  )
}

export default AboutMe
