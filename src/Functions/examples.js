import uniqid from 'uniqid'

function getSectionExamples() {
  return [
    { name: 'Name', id: uniqid() },
    { name: 'Position', id: uniqid() },
    { name: 'Links', id: uniqid() },
    { name: 'Skills', id: uniqid() },
    { name: 'Work Experience', id: uniqid() },
    { name: 'Personal Projects', id: uniqid() },
    { name: 'Education', id: uniqid() },
    { name: 'About Me', id: uniqid() },
  ]
}

function getNameExample() {
  return [{ forename: '' }, { surname: '' }]
}

function getLinksExample() {
  return [
    {
      placeholder: 'Email',
      hyperlink: 'lovro.zagar5@gmail.com',
      logo: 'Email',
    },
    {
      placeholder: 'Address',
      hyperlink: '10000 Zagreb, Croatia',
      logo: 'Address',
    },
    {
      placeholder: 'Phone',
      hyperlink: '(895) 306-5494',
      logo: 'Phone',
    },
    {
      placeholder: 'GitHub',
      hyperlink: 'https://github.com/lovrozagar',
      logo: 'GitHub',
    },
  ]
}

function getSkillsExample() {
  return [
    { text: 'Stealth', id: uniqid() },
    { text: 'Agility', id: uniqid() },
    { text: 'Fruit Slicing', id: uniqid() },
    { text: 'Shuriken Throwing', id: uniqid() },
  ]
}

function getWorkExperienceExample() {
  return [
    {
      company: 'Stealth Corp.',
      location: 'Tokyo, JP',
      position: 'Professional Ninja',
      time: 'Sep 2021 - Present',
      id: uniqid(),
      points: [
        { text: 'Classified point #1', id: uniqid() },
        { text: 'Classified point #2', id: uniqid() },
      ],
    },
  ]
}

function getPersonalProjectsExample() {
  return [
    {
      name: 'Ninja CV App',
      showcasePlaceholder: 'Live',
      showcaseLink: 'https://lovrozagar.github.io/Ninja-CV',
      docsPlaceholder: 'Code',
      docsLink: 'https://github.com/lovrozagar/Ninja-CV',
      id: uniqid(),
      points: [
        {
          text: 'Forged a powerful CV builder app using the ancient ninja art of react programming to infiltrate and conquer the job market.',
          id: uniqid(),
        },
        { text: 'Successfully sliced thousands of resumes', id: uniqid() },
      ],
    },
  ]
}

function getEducationExample() {
  return [
    {
      school: 'Shadow Dojo',
      location: 'Osaka, JP',
      profession: 'Ninja Engineer',
      time: 'Sep 2015 - May 2019',
      id: uniqid(),
      points: [
        {
          text: 'Became a stealthy master of the code, learned to swiftly vanquish bugs and optimize performance.',
          id: uniqid(),
        },
      ],
    },
  ]
}

function getAboutMeExample() {
  return [
    {
      text: "As a ninja, my focus has always been on the art of the unseen. With years of training in the shadows, I have learned to master the art of stealth, speed, and precision. But my passion doesn't stop there. I have also developed a love for the art of technology and its endless possibilities.",
      id: uniqid(),
    },
  ]
}

export {
  getSectionExamples,
  getNameExample,
  getLinksExample,
  getSkillsExample,
  getWorkExperienceExample,
  getPersonalProjectsExample,
  getEducationExample,
  getAboutMeExample,
}
