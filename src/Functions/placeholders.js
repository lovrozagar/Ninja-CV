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

  function getSchool(index) {
    const schools = [
      'MIT',
      'Caltech',
      'Duke University',
      'Yale University',
      'Harvard University',
      'Stanford University',
      'Columbia University',
      'Princeton University',
      'University of Chicago',
      'Johns Hopkins University',
    ]

    return exampleFormat(schools, index)
  }

  function getProfession(index) {
    const professions = [
      'Computer Science',
      'Nursing',
      'Psychology',
      'Business Administration',
      'Engineering',
      'Education',
      'Graphic Design',
      'Journalism',
      'Criminal Justice',
      'Marketing',
    ]

    return exampleFormat(professions, index)
  }

  function getEducationPoint(index) {
    const points = [
      'Math: algebra, calculus, statistics',
      'Science: biology, chemistry, physics',
      'Literature: reading, writing, critical thinking',
      'History: world history, local history, politics',
      'Philosophy: ethics, logic, critical thinking',
      'Social sciences: sociology, psychology, anthropology',
      'Languages: grammar, vocabulary, syntax',
      'Fine arts: music, painting, theater',
      'Computer science: programming, algorithms, data structures',
      'Business: accounting, marketing, management',
    ]

    return exampleFormat(points, index)
  }

  function getProject(index) {
    const projects = [
      'Pet Care App',
      'Garden Tracker',
      'Fitness Tracker',
      'Online Recipe Box',
      'Meal Planning App',
      'DIY Home Automation',
      'Language Learning Game',
      'Online Learning Platform',
      'Virtual Closet Organizer',
      'Social Network for Book Lovers',
    ]

    return exampleFormat(projects, index)
  }

  function getProjectPoint(index) {
    const points = [
      'Designed the user interface and developed the front-end for the website',
      'Created a marathon training plan to track progress',
      'Used a language learning app and practice french daily',
      'Chose a game engine and developed the game mechanics',
      'Develop a podcast content strategy and record episodes',
      'Planed out the garden and researched plant care',
      'Chose a color scheme and created a budget for room renovation',
      'Created a project plan with specific milestones',
      'Documented project progress and earnings',
      'Wrote a script for a film',
    ]

    return exampleFormat(points, index)
  }

  function getShowcase(index) {
    const showcases = ['Website', 'Live', 'Showcase', 'Solution', 'Result']

    return exampleFormat(showcases, index)
  }

  function getDocs(index) {
    const docs = ['Documentation', 'Code', 'Steps', 'Plan', 'scheme']

    return exampleFormat(docs, index)
  }

  function getAboutParagraph(index) {
    const abouts = [
      'A creative and detail-oriented graphic designer with experience in creating visual concepts that communicate ideas that inspire, inform, and captivate consumers.',
      'A skilled software engineer with expertise in designing and implementing robust and scalable applications using the latest technologies and programming languages.',
      'An experienced project manager with a proven track record of delivering high-quality projects on time and within budget.',
      'Confident and effective communicator with experience in providing exceptional customer service and resolving complex issues in a timely and efficient manner.',
      'Data-driven marketer with expertise in developing and executing successful digital marketing campaigns that increase brand awareness, engagement, and sales.',
      'Results-driven sales professional with a proven ability to generate leads, close deals, and exceed sales targets in highly competitive markets.',
      'Skilled copywriter with a talent for creating compelling and persuasive content that engages audiences and drives conversions.',
      'Innovative UX designer with a passion for creating intuitive and user-friendly interfaces that enhance the user experience and drive engagement.',
      'Analytical and strategic thinker with experience in developing and implementing effective business strategies that drive growth and profitability.',
      'Diligent and detail-oriented accountant with expertise in financial reporting, budgeting, and analysis.',
    ]

    return exampleFormat(abouts, index)
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
    getSchool,
    getProfession,
    getEducationPoint,
    getProject,
    getProjectPoint,
    getShowcase,
    getDocs,
    getAboutParagraph,
  }
})()

export default Placeholders
