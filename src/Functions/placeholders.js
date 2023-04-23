const Placeholders = (() => {
  function exampleFormat(array, index) {
    return index < array.length
      ? `e.g. ${array[index]}`
      : `e.g. ${array[index - array.length]}`
  }

  function getFullNameRandom() {
    const names = [
      { forename: 'John', surname: 'Doe' },
      { forename: 'Jane', surname: 'Doe' },
      { forename: 'Bob', surname: 'Smith' },
      { forename: 'Alice', surname: 'Johnson' },
      { forename: 'Mike', surname: 'Davis' },
      { forename: 'Samantha', surname: 'Lee' },
      { forename: 'Chris', surname: 'Wilson' },
      { forename: 'Emily', surname: 'Garcia' },
      { forename: 'David', surname: 'Hernandez' },
      { forename: 'Jessica', surname: 'Rodriguez' },
    ]

    const random = names[Math.floor(Math.random() * names.length)]
    const { forename, surname } = random
    return { forename: `e.g. ${forename}`, surname: `e.g. ${surname}` }
  }

  function getPositionRandom() {
    const positions = [
      'App Developer',
      'UX Designer',
      'QA Tester',
      'Tech Writer',
      'Data Analyst',
      'Project Manager',
      'Marketing Specialist',
      'Content Creator',
      'Business Analyst',
      'Support Specialist',
    ]

    return `e.g. ${positions[Math.floor(Math.random() * positions.length)]}`
  }

  function getLinkName(index) {
    const names = [
      'Gmail',
      'Github',
      'LinkedIn',
      'Phone',
      'Address',
      'Website',
      'Portfolio',
      'Facebook',
      'Instagram',
      'My work',
    ]

    return exampleFormat(names, index)
  }

  function getUrl(index) {
    const urls = [
      'ninja.ninjito@gmail.com',
      'https://github.com/ninja',
      'https://www.linkedin.com/in/ninja/',
      '(224) 652-3661',
      '371 7th Ave, New York, NY 10001',
      'https://www.my-website.com/',
      'https://www.my-portfolio.com/',
      'https://www.my-website.com/',
      'https://www.facebook.com/ninja/',
      'https://www.instagram.com/ninja/',
      'https://www.my-work.com/',
    ]

    return exampleFormat(urls, index)
  }

  function getSkill(index) {
    const skills = [
      'fruit slicing',
      'stealth',
      'shuriken throwing',
      'sneaking',
      'sword-fighting',
      'poisoning',
      'climbing',
      'trap-setting',
      'disguise',
      'fire manipulation',
    ]

    return exampleFormat(skills, index)
  }

  function getCompany(index) {
    const companies = [
      'Apple Inc.',
      'Google LLC',
      'Amazon.com',
      'Facebook Inc.',
      'Microsoft',
      'Twitter Inc.',
      'Pinterest',
      'Snapchat Inc.',
      'LinkedIn Corp.',
      'Dropbox Inc.',
    ]

    return exampleFormat(companies, index)
  }

  function getLocation(index) {
    const locations = [
      'Zagreb, HR',
      'New York, US',
      'Paris, FR',
      'Sydney, AU',
      'Tokyo, JP',
      'London, UK',
      'Los Angeles, US',
      'Cape Town, ZA',
      'Rio de Janeiro, BR',
      'Dubai, AE',
    ]

    return exampleFormat(locations, index)
  }

  function getPosition(index) {
    const positions = [
      'App Developer',
      'UX Designer',
      'QA Tester',
      'Tech Writer',
      'Data Analyst',
      'Project Manager',
      'Marketing Specialist',
      'Content Creator',
      'Business Analyst',
      'Support Specialist',
    ]

    return exampleFormat(positions, index)
  }

  function getTime(index) {
    const time = [
      'Jan 2020 - Present',
      'Feb 2020 - Present',
      'Apr 2021 - Jun 2021',
      'Jul 2021 - Sep 2021',
      'Oct 2021 - Dec 2021',
      'Jan 2022 - Mar 2022',
      'Apr 2022 - Jun 2022',
      'Jul 2022 - Sep 2022',
      'Oct 2022 - Dec 2022',
    ]

    return exampleFormat(time, index)
  }

  function getPoint(index) {
    const bullets = [
      'Managed social media campaigns',
      'Analyzed campaign performance data',
      'Created visual content for social',
      'Interacted with customers online',
      'Developed social media strategies',
      'Designed mobile app UI',
      'Developed user-friendly interfaces',
      'Collaborated with development team',
      'Conducted user research studies',
      'Created wireframes and prototypes',
    ]

    return exampleFormat(bullets, index)
  }

  return {
    getFullNameRandom,
    getPositionRandom,
    getLinkName,
    getUrl,
    getSkill,
    getCompany,
    getLocation,
    getPosition,
    getTime,
    getPoint,
  }
})()

export default Placeholders
