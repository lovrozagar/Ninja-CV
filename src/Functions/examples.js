import uniqid from 'uniqid'

function getSectionExamples() {
  return [
    { name: 'Name', id: 'section-1' },
    { name: 'Position', id: 'section-2' },
    { name: 'Links', id: 'section-3' },
    { name: 'Skills', id: 'section-4' },
    { name: 'Work Experience', id: 'section-5' },
    { name: 'Personal Projects', id: 'section-6' },
    { name: 'Education', id: 'section-7' },
    { name: 'About Me', id: 'section-8' },
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
